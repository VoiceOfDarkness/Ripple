import random


async def generate_verification_code() -> str:
    return str(random.randint(100000, 999999))
