import os
import logging
from fastapi import HTTPException
from typing import Optional, Dict, Any
import requests
from urllib.parse import quote

# 创建logger
logger = logging.getLogger(__name__)

# 阿里云OSS配置
ALIYUN_OSS_ENDPOINT = os.getenv("ALIYUN_OSS_ENDPOINT", "oss-cn-beijing.aliyuncs.com")
ALIYUN_OSS_BUCKET = os.getenv("ALIYUN_OSS_BUCKET", "ultraman-videos")
ALIYUN_CDN_DOMAIN = os.getenv("ALIYUN_CDN_DOMAIN", "wx.99coc.cn")

# 视频文件的基础路径
VIDEO_BASE_PATH = "ultra/videos/"

class AliyunStorageClient:
    """
    阿里云存储客户端，用于处理视频文件访问
    """
    
    @staticmethod
    def get_video_url(video_key: str) -> str:
        """
        获取视频的URL
        
        Args:
            video_key: 视频文件的键名（相对路径，不包含基础路径）
        
        Returns:
            视频的完整URL
        """
        # 如果已经是完整URL，则直接返回
        if video_key.startswith(('http://', 'https://')):
            return video_key
            
        # 直接从阿里云OSS获取视频，避免通过本地服务代理
        # 使用OSS直接访问
        url = f"https://{ALIYUN_OSS_BUCKET}.{ALIYUN_OSS_ENDPOINT}/{VIDEO_BASE_PATH}{quote(video_key)}"
        
        # 记录生成的URL用于调试
        logger.info(f"生成视频URL: {url}")
            
        return url
        
    @staticmethod
    def check_video_exists(video_key: str) -> bool:
        """
        检查视频文件是否存在
        
        Args:
            video_key: 视频文件的键名（相对路径，不包含基础路径）
            
        Returns:
            布尔值，表示文件是否存在
        """
        # 构建视频URL
        video_url = AliyunStorageClient.get_video_url(video_key)
        
        try:
            # 使用HEAD请求检查文件是否存在
            response = requests.head(video_url, timeout=5)
            return response.status_code == 200
        except Exception as e:
            logger.error(f"检查视频文件存在性时出错: {str(e)}")
            return False
    
    @staticmethod
    def get_video_metadata(video_key: str) -> Optional[Dict[str, Any]]:
        """
        获取视频文件的元数据
        
        Args:
            video_key: 视频文件的键名（相对路径，不包含基础路径）
            
        Returns:
            包含视频元数据的字典，如果出错则返回None
        """
        # 构建视频URL
        video_url = AliyunStorageClient.get_video_url(video_key)
        
        try:
            # 使用HEAD请求获取元数据
            response = requests.head(video_url, timeout=5)
            
            if response.status_code == 200:
                return {
                    "content_type": response.headers.get("Content-Type", "video/mp4"),
                    "content_length": int(response.headers.get("Content-Length", 0)),
                    "last_modified": response.headers.get("Last-Modified", ""),
                    "etag": response.headers.get("ETag", "").strip('"')
                }
            return None
        except Exception as e:
            logger.error(f"获取视频元数据时出错: {str(e)}")
            return None 