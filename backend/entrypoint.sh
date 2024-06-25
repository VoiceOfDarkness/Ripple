#!/bin/bash
set -e

# Run Alembic migrations
# echo "Running migrations..."
# alembic upgrade head

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn app.main:app \
  --name main \
  --workers 3 \
  --bind 0.0.0.0:8000 \
  --config /app/gunicorn_conf.py \
  --preload \
  --timeout 120 \
  --log-level info \
  --access-logfile - \
  --error-logfile - \
  "$@"
