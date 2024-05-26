import secrets


def generate_random_string() -> str:
    return secrets.token_urlsafe(32)
