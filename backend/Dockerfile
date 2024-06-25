FROM python:3.11.9-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.8.2 \
    POETRY_HOME="/opt/poetry" \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup"

# Set the working directory
WORKDIR $PYSETUP_PATH

# Update system and install necessary packages
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install "poetry==$POETRY_VERSION"

# Copy the poetry.lock and pyproject.toml
COPY poetry.lock pyproject.toml ./



# Install project dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copy the app
COPY ./app ./app

# alembic
COPY ./alembic ./alembic
COPY ./alembic.ini ./alembic.ini

# Gunicorn
COPY ./gunicorn_conf.py ./gunicorn_conf.py

# Expose the port the app runs in
EXPOSE 8000

# For development
# ENTRYPOINT ["poetry", "run"]
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# For production
COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]