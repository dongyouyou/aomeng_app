import requests
import logging
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, WECHAT_APPID, WECHAT_SECRET

# 设置日志
logger = logging.getLogger(__name__)

# 密码哈希工具
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    """
    创建JWT访问令牌
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_wechat_openid(code: str):
    """
    通过微信小程序code获取openid
    """
    if not code:
        print("ERROR: 微信登录code为空")
        return None
    
    # 打印完整的请求URL和参数（隐藏敏感信息）
    url = f"https://api.weixin.qq.com/sns/jscode2session?appid={WECHAT_APPID}&secret={WECHAT_SECRET}&js_code={code}&grant_type=authorization_code"
    safe_url = f"https://api.weixin.qq.com/sns/jscode2session?appid={WECHAT_APPID[:4]}***&secret={WECHAT_SECRET[:4]}***&js_code={code[:4]}***&grant_type=authorization_code"
    print(f"请求微信接口: {safe_url}")
    
    try:
        # 增加更长的超时时间
        response = requests.get(url, timeout=30)
        print(f"微信API响应状态码: {response.status_code}")
        print(f"微信API响应内容: {response.text}")
        
        if response.status_code != 200:
            print(f"微信API请求失败: 状态码={response.status_code}, 响应={response.text}")
            return None
        
        data = response.json()
        
        # 检查返回的错误码
        if "errcode" in data and data["errcode"] != 0:
            err_msg = f"微信API返回错误: errcode={data['errcode']}, errmsg={data.get('errmsg', '')}"
            print(err_msg)
            return None
        
        openid = data.get("openid")
        if not openid:
            print(f"微信返回数据中没有openid: {data}")
            return None
        
        return openid
    
    except requests.exceptions.Timeout:
        print(f"请求微信API超时")
        return None
    except requests.exceptions.ConnectionError:
        print(f"连接微信API失败，请检查网络")
        return None
    except ValueError as e:
        print(f"解析微信API响应失败: {str(e)}, 原始响应: {response.text if 'response' in locals() else '未收到响应'}")
        return None
    except Exception as e:
        print(f"请求微信API未知异常: {str(e)}")
        return None

def update_user_info(user, user_info=None):
    """
    更新用户信息
    """
    if not user_info:
        return
    
    # 更新用户昵称和头像
    if "nickName" in user_info:
        user.nickname = user_info.get("nickName")
    if "avatarUrl" in user_info:
        user.avatar_url = user_info.get("avatarUrl")
    
    return user 