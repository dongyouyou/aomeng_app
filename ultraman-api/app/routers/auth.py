from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
from jose import JWTError, jwt
from typing import Optional
import logging

from app.models.database import get_db
from app.models.user import User
from app.utils.auth import create_access_token, get_wechat_openid
from app.config import SECRET_KEY, ALGORITHM, WECHAT_APPID, WECHAT_SECRET

# 设置日志记录器
logger = logging.getLogger(__name__)

router = APIRouter(tags=["认证"])

# OAuth2 密码流
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 请求模型
class LoginRequest(BaseModel):
    code: str
    userInfo: Optional[dict] = None

# 响应模型
class Token(BaseModel):
    access_token: str
    token_type: str

class UserInfo(BaseModel):
    id: int
    openid: str
    nickname: str
    avatar_url: str

    class Config:
        orm_mode = True

# 获取当前用户
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="无效的认证凭证",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        openid: str = payload.get("sub")
        if openid is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.openid == openid).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/login", response_model=Token)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    用户登录接口
    """
    # 增加调试信息
    debug_info = {
        "code_length": len(request.code) if request.code else 0,
        "has_user_info": request.userInfo is not None,
        "env_vars": {
            "has_appid": bool(WECHAT_APPID),
            "has_secret": bool(WECHAT_SECRET),
            "has_secret_key": bool(SECRET_KEY)
        }
    }
    
    print(f"DEBUG INFO: {debug_info}")  # 打印到标准输出，确保可以在服务器日志中看到
    
    # 获取微信openid前检查环境变量
    if not WECHAT_APPID or not WECHAT_SECRET:
        error_msg = "服务器配置错误: 微信参数未设置"
        print(f"ERROR: {error_msg}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )
    
    # 获取微信openid
    try:
        openid = get_wechat_openid(request.code)
        if not openid:
            error_msg = "无法获取微信openid，请检查微信配置参数和网络"
            print(f"ERROR: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg
            )
        
        print(f"成功获取openid: {openid[:5]}***")
        
        # 查找用户
        user = db.query(User).filter(User.openid == openid).first()
        
        # 如果用户不存在，创建新用户
        if not user:
            logger.info(f"用户不存在，创建新用户")
            user = User(
                openid=openid
            )
            # 如果提供了用户信息，更新用户信息
            if request.userInfo:
                user.nickname = request.userInfo.get('nickName', '奥特曼迷')
                user.avatar_url = request.userInfo.get('avatarUrl', '/images/default-avatar.png')
                logger.info(f"使用提供的用户信息: nickname={user.nickname[:2]}**")
                
            try:
                db.add(user)
                db.commit()
                db.refresh(user)
                logger.info(f"新用户创建成功: id={user.id}")
            except Exception as e:
                logger.error(f"创建用户失败: {str(e)}")
                db.rollback()
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="创建用户失败"
                )
        else:
            logger.info(f"找到现有用户: id={user.id}")
        
        # 如果用户存在且提供了用户信息，更新用户信息
        if user and request.userInfo:
            try:
                user.nickname = request.userInfo.get('nickName', user.nickname)
                user.avatar_url = request.userInfo.get('avatarUrl', user.avatar_url)
                db.commit()
                db.refresh(user)
                logger.info(f"用户信息更新成功: id={user.id}")
            except Exception as e:
                logger.error(f"更新用户信息失败: {str(e)}")
                db.rollback()
        
        # 创建访问令牌
        try:
            access_token = create_access_token(
                data={"sub": user.openid}
            )
            logger.info(f"创建访问令牌成功")
            return {"access_token": access_token, "token_type": "bearer"}
        except Exception as e:
            logger.error(f"创建令牌失败: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="创建令牌失败"
            )
    except Exception as e:
        error_detail = f"登录处理异常: {str(e)}"
        print(f"CRITICAL ERROR: {error_detail}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_detail
        )

@router.get("/login")
async def login_test():
    """
    登录测试接口 - 仅用于测试，生产环境应移除
    """
    return {"message": "登录接口需要使用POST方法，并提供微信code参数"}

@router.get("/me", response_model=UserInfo)
async def get_user_info(current_user: User = Depends(get_current_user)):
    """
    获取当前登录用户信息
    """
    return current_user 