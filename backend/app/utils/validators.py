def validate_file_type(content_type: str) -> bool:
    """Validate if content type is an accepted image type."""
    return content_type.startswith("image/")

def validate_file_size(file_size: int, max_size_mb: int = 5) -> bool:
    """Validate if file size is within limits."""
    max_size_bytes = max_size_mb * 1024 * 1024
    return file_size <= max_size_bytes

def validate_image_dimensions(width: int, height: int, min_dim: int = 50, max_dim: int = 4000) -> bool:
    """Validate image dimensions are within reasonable bounds."""
    return min_dim <= width <= max_dim and min_dim <= height <= max_dim