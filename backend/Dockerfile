# Use official Python lightweight image
FROM python:3.10-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Command to run application explicitly on port 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
