from fastapi import APIRouter, HTTPException, Query, Request, Depends
from fastapi.responses import JSONResponse, RedirectResponse
from typing import Optional, List, Dict, Any
import logging
from pydantic import BaseModel
from app.utils.aliyun_storage import AliyunStorageClient
from app.routers.auth import get_current_user

# 创建logger
logger = logging.getLogger(__name__)

# 创建路由
router = APIRouter(
    prefix="/api/videos",
    tags=["videos"],
    responses={404: {"description": "Not found"}},
)

# 视频信息模型
class VideoInfo(BaseModel):
    key: str
    title: str
    description: Optional[str] = None
    url: str
    thumbnail: Optional[str] = None
    duration: Optional[int] = None
    size: Optional[int] = None
    content_type: Optional[str] = "video/mp4"

# 获取单个视频信息接口
@router.get("/{video_key}", response_model=VideoInfo)
async def get_video_info(
    video_key: str,
    request: Request,
    current_user: Dict = Depends(get_current_user)
):
    """
    获取视频信息
    
    Args:
        video_key: 视频的唯一标识符
        
    Returns:
        视频的详细信息
    """
    try:
        # 检查视频是否存在
        if not AliyunStorageClient.check_video_exists(video_key):
            raise HTTPException(status_code=404, detail="视频不存在")
            
        # 获取视频元数据
        metadata = AliyunStorageClient.get_video_metadata(video_key)
        
        # 获取视频URL
        video_url = AliyunStorageClient.get_video_url(video_key)
        
        # 构建视频信息响应
        video_info = VideoInfo(
            key=video_key,
            title=video_key.split("/")[-1].replace(".mp4", "").replace("_", " ").title(),
            url=video_url,
            thumbnail=f"{video_url.rsplit('.', 1)[0]}.jpg",  # 假设缩略图与视频同名，仅扩展名不同
            content_type=metadata.get("content_type", "video/mp4") if metadata else "video/mp4",
            size=metadata.get("content_length", 0) if metadata else 0,
        )
        
        return video_info
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"获取视频信息时出错: {str(e)}")
        raise HTTPException(status_code=500, detail="获取视频信息失败")

# 重定向到视频URL的接口
@router.get("/{video_key}/redirect")
async def redirect_to_video(
    video_key: str,
    request: Request,
    current_user: Dict = Depends(get_current_user)
):
    """
    重定向到视频的实际URL
    
    Args:
        video_key: 视频的唯一标识符
        
    Returns:
        重定向响应
    """
    try:
        # 检查视频是否存在
        if not AliyunStorageClient.check_video_exists(video_key):
            raise HTTPException(status_code=404, detail="视频不存在")
            
        # 获取视频URL
        video_url = AliyunStorageClient.get_video_url(video_key)
        
        # 返回重定向响应
        return RedirectResponse(url=video_url)
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"重定向到视频URL时出错: {str(e)}")
        raise HTTPException(status_code=500, detail="重定向到视频失败")

# 获取英雄故事视频列表接口
@router.get("/hero/{hero_key}/stories", response_model=List[VideoInfo])
async def get_hero_story_videos(
    hero_key: str,
    request: Request,
    current_user: Dict = Depends(get_current_user)
):
    """
    获取指定英雄的故事视频列表
    
    Args:
        hero_key: 英雄的唯一标识符（例如：tiga, seven等）
        
    Returns:
        视频信息列表
    """
    try:
        # 这里可以根据实际需求从数据库或配置文件中获取英雄故事的视频列表
        # 这里我们使用硬编码的示例数据，实际应用中应该从数据库获取
        hero_videos = []
        
        if hero_key == "tiga":
            video_keys = [
                "tiga/tiga_ancient.mp4",
                "tiga/tiga_revival.mp4",
                "tiga/tiga_modern.mp4",
                "tiga/tiga_final_holy_battle.mp4"
            ]
            titles = [
                "远古时代",
                "古代巨人的复活",
                "现代篇",
                "最终圣战"
            ]
            descriptions = [
                "迪迦的远古起源",
                "古代巨人的复活",
                "迪迦的现代战役",
                "迪迦与黑暗巨人的圣战"
            ]
        elif hero_key == "seven":
            video_keys = [
                "seven/seven_ugs.mp4",
                "seven/seven_earth_defense.mp4",
                "seven/seven_final_battle.mp4"
            ]
            titles = [
                "宇宙警备队篇",
                "地球防卫篇",
                "最终决战篇"
            ]
            descriptions = [
                "赛文作为宇宙警备队成员的日子",
                "赛文与地球防卫队的战斗",
                "赛文与庞顿星人的最终决战"
            ]
        else:
            # 其他英雄可以添加更多视频键
            video_keys = []
            titles = []
            descriptions = []
        
        # 获取每个视频的信息
        for i, video_key in enumerate(video_keys):
            full_key = video_key
            
            # 检查视频是否存在
            if AliyunStorageClient.check_video_exists(full_key):
                # 获取视频URL
                video_url = AliyunStorageClient.get_video_url(full_key)
                
                # 获取元数据（如果可用）
                metadata = AliyunStorageClient.get_video_metadata(full_key)
                
                # 添加到视频列表
                hero_videos.append(
                    VideoInfo(
                        key=full_key,
                        title=titles[i] if i < len(titles) else video_key.replace(".mp4", "").replace("_", " ").title(),
                        description=descriptions[i] if i < len(descriptions) else None,
                        url=video_url,
                        thumbnail=f"{video_url.rsplit('.', 1)[0]}.jpg",
                        content_type=metadata.get("content_type", "video/mp4") if metadata else "video/mp4",
                        size=metadata.get("content_length", 0) if metadata else 0,
                    )
                )
        
        return hero_videos
    except Exception as e:
        logger.error(f"获取英雄故事视频列表时出错: {str(e)}")
        raise HTTPException(status_code=500, detail="获取英雄故事视频列表失败") 