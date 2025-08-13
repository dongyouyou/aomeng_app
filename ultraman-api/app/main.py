from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
import sys
from logging.handlers import RotatingFileHandler

# 添加项目根目录到Python路径
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 现在导入项目模块
from app.models.database import Base, engine
from app.routers import auth, videos
from app.config import ALLOWED_ORIGINS, IS_DEVELOPMENT, SECRET_KEY

# 创建日志目录
log_dir = "logs"
if not os.path.exists(log_dir):
    os.makedirs(log_dir)

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        RotatingFileHandler(
            os.path.join(log_dir, "ultraman_api.log"),
            maxBytes=10*1024*1024,  # 10MB
            backupCount=5
        ),
        logging.StreamHandler()
    ]
)

# 创建logger
logger = logging.getLogger(__name__)

# 检查必要的环境变量
if not SECRET_KEY and not os.getenv("SECRET_KEY"):
    logger.warning("警告: SECRET_KEY未设置，将使用开发密钥")
    os.environ["SECRET_KEY"] = "dev_secret_key_for_testing_only"

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 创建FastAPI应用
app = FastAPI(
    title="奥特曼API",
    description="奥特曼图鉴小程序后端API",
    version="0.1.0",
    root_path="/ultraman-api"  # 添加路由前缀
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(auth.router)
app.include_router(videos.router)  # 注册视频路由

@app.get("/")
async def root():
    logger.info("访问根路径")
    return {"message": "欢迎使用奥特曼API"}

@app.get("/api/")
async def api_root():
    return {"message": "Welcome to Ultraman API - API Root Path"}

@app.get("/api/test")
async def test_api():
    """
    简单测试接口 - 用于验证API可访问性
    """
    return {
        "status": "success",
        "message": "API测试接口正常工作！",
        "timestamp": "2023-03-18T12:00:00Z"
    }

# 服务器启动事件
@app.on_event("startup")
async def startup_event():
    logger.info("服务启动")

# 服务器关闭事件
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("服务关闭")

if __name__ == "__main__":
    import uvicorn
    
    if IS_DEVELOPMENT:
        # 开发环境配置
        uvicorn.run(
            "app.main:app",
            host="0.0.0.0",
            port=8081,
            reload=True
        )
    else:
        # 生产环境配置（使用nginx反向代理）
        uvicorn.run(
            "app.main:app",
            host="127.0.0.1",  # 只监听本地地址
            port=8081,         # 使用8081端口
            workers=4
        ) 