# 奥特曼图鉴API

这是奥特曼图鉴小程序的后端API服务，提供用户认证和数据管理功能。

## 功能特性

- 微信小程序登录认证
- 获取用户手机号
- JWT令牌认证
- 用户信息管理

## 技术栈

- Python 3.8+
- FastAPI
- SQLAlchemy
- SQLite数据库 (可替换为MySQL或PostgreSQL)

## 安装部署

### 本地开发环境

1. 克隆代码库
```bash
git clone https://github.com/your-username/ultraman-api.git
cd ultraman-api
```

2. 安装依赖
```bash
pip install -r requirements.txt
```

3. 运行开发服务器
```bash
uvicorn app.main:app --reload
```

### 阿里云服务器部署

#### 手动部署

1. 在阿里云ECS上安装Python环境
```bash
sudo apt update
sudo apt install python3 python3-pip
```

2. 创建部署目录
```bash
mkdir -p /opt/ultraman-api
```

3. 上传项目文件到服务器
```bash
scp -r ./* user@your_service_ip_address:/opt/ultraman-api/
```

4. 安装依赖
```bash
cd /opt/ultraman-api
pip3 install -r requirements.txt
pip3 install gunicorn
```

5. 创建systemd服务
```bash
sudo nano /etc/systemd/system/ultraman-api.service
```

添加以下内容：
```
[Unit]
Description=Ultraman API Service
After=network.target

[Service]
User=root
WorkingDirectory=/opt/ultraman-api
ExecStart=/usr/local/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8081 app.main:app
Restart=always
StandardOutput=file:/var/log/ultraman-api.log
StandardError=file:/var/log/ultraman-api.error.log

[Install]
WantedBy=multi-user.target
```

6. 配置Nginx
```bash
sudo nano /etc/nginx/conf.d/ultraman-api.conf
```

添加以下内容：
```nginx
server {
    listen 80;
    server_name your_service_ip_address;

    location /api/ {
        proxy_pass http://127.0.0.1:8081/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /docs {
        proxy_pass http://127.0.0.1:8081/docs;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /openapi.json {
        proxy_pass http://127.0.0.1:8081/openapi.json;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

7. 启动服务
```bash
sudo systemctl daemon-reload
sudo systemctl enable ultraman-api
sudo systemctl start ultraman-api
sudo nginx -t && sudo systemctl reload nginx
```

#### 使用部署脚本

项目提供了自动部署脚本，可以一键部署：

1. 上传项目文件到服务器
2. 赋予部署脚本执行权限
```bash
chmod +x deploy.sh
```

3. 执行部署脚本
```bash
sudo ./deploy.sh
```

## 环境变量配置

在生产环境中，请设置以下环境变量：

- `DATABASE_URL`: 数据库连接URL
- `SECRET_KEY`: JWT密钥
- `WECHAT_APPID`: 微信小程序AppID
- `WECHAT_SECRET`: 微信小程序AppSecret

可以通过在`/etc/environment`文件中添加这些变量，或者在systemd服务文件中设置：

```
[Service]
Environment="DATABASE_URL=sqlite:///./ultraman.db"
Environment="SECRET_KEY=your_secure_secret_key"
Environment="WECHAT_APPID=your_wechat_appid"
Environment="WECHAT_SECRET=your_wechat_secret"
```

## API文档

启动服务后，访问 http://your_service_ip_address/docs 查看自动生成的API文档。

### 主要接口

- `POST /api/login`: 用户登录
- `GET /api/me`: 获取当前用户信息

## 许可证

MIT 