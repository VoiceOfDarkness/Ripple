from typing import Any, Dict, Optional

from fastapi import HTTPException, status


class ValidationError(HTTPException):
    def __init__(self, detail: Any = None, headers: Optional[Dict[str, Any]] = None):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail
        )


class AuthError(HTTPException):
    def __init__(self, detail: Any = None, headers: Optional[Dict[str, Any]] = None):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)
