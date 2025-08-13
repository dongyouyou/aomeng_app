#!/bin/bash

# 设置环境变量
export PYTHONPATH=$PWD
export ENV=production
export SECRET_KEY=test_secret_key_for_deployment

# 安装依赖（如果需要）
pip install -r requirements.txt

# 创建日志目录
mkdir -p logs

# 测试直接启动应用
echo "测试使用uvicorn直接启动应用..."
python -m uvicorn app.main:app --host 127.0.0.1 --port 8081 --workers 1 &
PID=$!
sleep 3
kill $PID

# 测试使用gunicorn启动应用
echo "测试使用gunicorn启动应用..."
gunicorn -w 1 -k uvicorn.workers.UvicornWorker -b 127.0.0.1:8081 app.main:app --timeout 120

echo "测试完成！" 