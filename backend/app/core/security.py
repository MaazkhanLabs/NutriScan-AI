from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Optional

def create_access_token(
    subject: str | int,
    expires_delta: Optional[timedelta] = None,
) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jose_jwt.encode(
        to_encode, 
        "your-secret-key", 
        algorithm="HS256"
    )
    return encoded_jwt

def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token, 
            "your-secret-key", 
            algorithms=["HS256"]
        )
        return payload
    except JWTError:
        return {}