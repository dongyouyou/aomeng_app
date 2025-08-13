# 模型包初始化文件
from app.models.database import Base, engine

# 导入所有模型以便创建表
from app.models.user import User

# 创建所有表
def create_tables():
    Base.metadata.create_all(bind=engine) 