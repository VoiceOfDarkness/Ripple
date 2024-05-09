FROM python:3.12.3-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /app

# Set the working directory
WORKDIR /app/

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install poetry
# Copy the poetry.lock and pyproject.toml
COPY pyproject.toml poetry.lock* /app/

# Install project dependencies
RUN poetry install --no-interaction --no-ansi

# Copy the app
COPY ./app /app/app/

# Expose the port the app runs in
EXPOSE 8000

# # The command to run the app when the container is started
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]