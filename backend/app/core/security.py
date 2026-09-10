import hashlib
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Optional

SECRET_KEY = "nutriscan-secret-key-2026-secure"
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    salt = "nutriscan_salt_2026"
    pwd_bytes = password[:72].encode('utf-8')
    return hashlib.sha256(pwd_bytes + salt.encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not hashed_password:
        return False
    # Check sha256 match
    if hash_password(plain_password) == hashed_password:
        return True
    return False

def create_access_token(
    subject: str | int,
    expires_delta: Optional[timedelta] = None,
) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=7)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode, 
        SECRET_KEY, 
        algorithm=ALGORITHM
    )
    return encoded_jwt

def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token, 
            SECRET_KEY, 
            algorithms=[ALGORITHM]
        )
        return payload
    except JWTError:
        return {}