import os
from typing import List
from datetime import timedelta
import logging

# 创建logger
logger = logging.getLogger(__name__)

# 环境配置
ENV = os.getenv("ENV", "development")
IS_DEVELOPMENT = ENV == "development"

# 域名配置
API_DOMAIN = os.getenv("API_DOMAIN", "www.99coc.cn")

# 数据库配置
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./ultraman.db")

# JWT配置
# 获取密钥，如果不存在，则在主模块中设置一个默认值（仅用于开发）
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY and not IS_DEVELOPMENT:
    logger.warning("警告: 生产环境中未设置SECRET_KEY环境变量")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7天

# 微信小程序配置
WECHAT_APPID = os.getenv("WECHAT_APPID")
WECHAT_SECRET = os.getenv("WECHAT_SECRET")

# CORS配置
ALLOWED_ORIGINS: List[str] = [
    f"https://{API_DOMAIN}",
    "https://servicewechat.com"
]

if IS_DEVELOPMENT:
    # 开发环境允许额外的源
    ALLOWED_ORIGINS.extend([
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "*"  # 开发环境允许所有来源
    ]) 