#!/bin/bash

echo "Checking application health..."

# Check if port 3000 is listening
if lsof -i :3000 > /dev/null; then
    echo "Application is running on port 3000"

    # Test health endpoint
    RESPONSE=$(curl -s -w "%{http_code}" http://localhost:3000/health)
    if [ "$RESPONSE" = "200" ]; then
        echo "Health check passed - application is healthy"
    else
        echo "Health check failed with status code: $RESPONSE"
    fi
else
    echo "Application is not running on port 3000"
fi