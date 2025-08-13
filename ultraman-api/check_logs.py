#!/usr/bin/env python3
"""
日志查看脚本
用于检查ultraman-api的登录相关日志
"""
import os
import re
import argparse
import sys
from datetime import datetime, timedelta

def get_last_n_lines(file_path, n=100):
    """获取文件最后n行"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            return lines[-n:] if len(lines) > n else lines
    except Exception as e:
        print(f"读取文件失败: {e}")
        return []

def filter_logs_by_time(lines, hours=1):
    """按时间过滤日志"""
    time_pattern = r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})'
    cutoff_time = datetime.now() - timedelta(hours=hours)
    
    filtered_lines = []
    for line in lines:
        match = re.search(time_pattern, line)
        if match:
            try:
                log_time = datetime.strptime(match.group(1), '%Y-%m-%d %H:%M:%S')
                if log_time >= cutoff_time:
                    filtered_lines.append(line)
            except ValueError:
                continue
    
    return filtered_lines

def filter_logs_by_keyword(lines, keyword):
    """按关键词过滤日志"""
    return [line for line in lines if keyword.lower() in line.lower()]

def main():
    parser = argparse.ArgumentParser(description='检查ultraman-api的日志')
    parser.add_argument('-t', '--time', type=int, default=1, help='过去多少小时的日志 (默认: 1)')
    parser.add_argument('-n', '--lines', type=int, default=100, help='查看最后多少行 (默认: 100)')
    parser.add_argument('-k', '--keyword', type=str, help='按关键词过滤')
    parser.add_argument('-f', '--file', type=str, default='logs/ultraman_api.log', help='日志文件路径')
    
    args = parser.parse_args()
    
    log_file = args.file
    if not os.path.exists(log_file):
        print(f"日志文件不存在: {log_file}")
        sys.exit(1)
    
    lines = get_last_n_lines(log_file, args.lines)
    
    # 按时间过滤
    if args.time > 0:
        lines = filter_logs_by_time(lines, args.time)
    
    # 按关键词过滤
    if args.keyword:
        lines = filter_logs_by_keyword(lines, args.keyword)
    
    # 输出结果
    if not lines:
        print("没有找到符合条件的日志")
    else:
        print(f"找到 {len(lines)} 条日志:")
        for line in lines:
            print(line.strip())

if __name__ == "__main__":
    main()