FROM python:3.11.9-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.8.2 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

# Set the working directory
WORKDIR /app/

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*н

# Install Poetry
RUN pip install poetry
# Copy the poetry.lock and pyproject.toml
RUN poetry config virtualenvs.in-project true
COPY poetry.lock pyproject.toml /app/

# Install project dependencies
RUN poetry install --no-interaction --no-ansi --no-root

# Copy the app
COPY ./app /app/app/

# Expose the port the app runs in
EXPOSE 8000

# The command to run the app when the container is started
# CMD ["poetry", "run", "pip", "list"]

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
