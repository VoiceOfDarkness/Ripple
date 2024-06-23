import uuid
import aiofiles
import shutil

from pathlib import Path
from typing import List
from fastapi import UploadFile

from app.core.config import settings


async def save_files(files: List[UploadFile]) -> List[str]:
    unique_id = str(uuid.uuid4())
    dir_path = Path(settings.MEDIA_ROOT) / unique_id
    dir_path.mkdir(parents=True, exist_ok=True)

    file_paths = []

    for file in files:
        file_path = dir_path / file.filename
        async with aiofiles.open(file_path, "wb") as out_file:
            while content := await file.read(settings.DEFAULT_CHUNK_SIZE):
                await out_file.write(content)
        file_paths.append(f"{unique_id}/{file.filename}")

    return file_paths


async def remove_files(file_paths: List[str]) -> None:
    for file_path in file_paths:
        path = Path(settings.MEDIA_ROOT) / file_path
        dir_path = path.parent
        if path.exists():
            shutil.rmtree(dir_path, ignore_errors=True)
    return None
