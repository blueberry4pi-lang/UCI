# UCI Cycling Data Application - Deployment Guide

This document provides comprehensive instructions for deploying the UCI Cycling Data Application.

## Overview

The UCI Cycling Data Application is a Node.js web application that provides real-time cycling data including race information, rankings, and countdown timers. The application is containerized for easy deployment using Docker and Portainer.

## Prerequisites

- Docker and Docker Compose installed
- Portainer (for containerized deployment)
- Basic understanding of Docker and containerization

## Deployment Options

### 1. Local Development

#### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

#### Setup Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. For development with auto-restart:
   ```bash
   npm run dev
   ```

### 2. Docker Deployment

#### Build the Docker Image
```bash
docker build -t uci-cycling-app .
```

#### Run the Container
```bash
docker run -p 3000:3000 uci-cycling-app
```

### 3. Portainer Deployment

#### Steps:
1. Log into Portainer
2. Create a new stack
3. Copy the contents of `docker-compose.yml` into the stack configuration
4. Deploy the stack
5. Access the application at `http://<your-host>:3000`

## Configuration

### Environment Variables

The application supports the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port to run the application on | `3000` |
| `NODE_ENV` | Node.js environment | `production` |

### Docker Configuration

The Dockerfile and docker-compose.yml are already configured for:
- Production-ready container
- Health checks
- Non-root user execution
- Proper volume mounting for logs

## Application Structure

```
uci-cycling-app/
├── src/
│   ├── api/
│   │   ├── routes/          # API route handlers
│   │   └── controllers/     # API controllers
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   └── app.js               # Main application file
├── public/                  # Static assets (HTML, CSS, JS)
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker build configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## API Endpoints

### Race Endpoints
- `GET /api/races` - Get all races
- `GET /api/races/category/:category` - Get races by category (mens/womens)
- `GET /api/races/next` - Get next race
- `GET /api/races/prestige/:prestige` - Get races by prestige level
- `GET /api/races/upcoming` - Get upcoming races

### Ranking Endpoints
- `GET /api/rankings/mens` - Get men's rankings
- `GET /api/rankings/womens` - Get women's rankings
- `GET /api/rankings/teams` - Get team rankings

### Countdown Endpoints
- `GET /api/countdown/next` - Get countdown to next race

### Health Check
- `GET /health` - Health status endpoint

## Monitoring and Maintenance

### Health Checks
The application includes a health check endpoint at `/health` that returns:
```json
{
  "status": "OK",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "service": "UCI Cycling Data Application"
}
```

### Logging
Application logs are stored in the `logs` directory when running in Docker containers.

## Troubleshooting

### Common Issues

1. **Port already in use**: 
   - Change the port in `docker-compose.yml` or `package.json`
   - Stop existing processes using the port

2. **Docker build failures**:
   - Ensure Docker is running
   - Check network connectivity for package downloads

3. **Application not starting**:
   - Check logs in the `logs` directory
   - Verify environment variables
   - Ensure dependencies are installed correctly

### Logs Access
In Docker containers, logs can be accessed using:
```bash
docker logs uci-cycling-app
```

## Security Considerations

- The application runs as a non-root user in Docker containers
- Health checks are implemented for monitoring
- No sensitive data is stored in the container image
- Environment variables should be used for configuration

## Future Enhancements

- Integration with actual UCI APIs
- Database persistence for race data
- User authentication system
- Real-time data updates
- Advanced filtering and search capabilities