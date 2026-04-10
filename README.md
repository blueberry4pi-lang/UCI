# UCI Cycling Data Application

A complete Node.js application that retrieves and displays UCI (Union Cycliste Internationale) cycling data including race information, rankings, and countdown timers.

## Features

- **Real-time UCI Data**: Fetches race information from UCI APIs
- **Daily Synchronization**: Automatically updates data every day at 2 AM
- **Race Listings**: Displays upcoming races with prestige highlighting
- **Countdown Timer**: Shows time remaining to next race
- **UCI Rankings**: Displays men's and women's rider rankings and team rankings
- **Portainer Ready**: Dockerized for easy deployment on Portainer

## Project Structure

```
uci-cycling-app/
├── src/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── races.js
│   │   │   ├── rankings.js
│   │   │   └── countdown.js
│   │   └── controllers/
│   │       ├── raceController.js
│   │       ├── rankingController.js
│   │       └── countdownController.js
│   ├── services/
│   │   ├── raceDataService.js
│   │   ├── rankingService.js
│   │   └── synchronizationService.js
│   ├── utils/
│   │   └── dateUtils.js
│   ├── config/
│   │   └── apiConfig.js
│   └── app.js
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Docker and Docker Compose (for containerized deployment)

### Local Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

### Development Setup

For development with auto-restart:
```bash
npm run dev
```

## Usage

The application will be available at `http://localhost:3000`

### API Endpoints

- `GET /api/races` - Get all races
- `GET /api/races/category/:category` - Get races by category (mens/womens)
- `GET /api/races/next` - Get next race
- `GET /api/races/prestige/:prestige` - Get races by prestige level
- `GET /api/races/upcoming` - Get upcoming races
- `GET /api/rankings/mens` - Get men's rankings
- `GET /api/rankings/womens` - Get women's rankings
- `GET /api/rankings/teams` - Get team rankings
- `GET /api/countdown/next` - Get countdown to next race

## Deployment

### Docker Deployment

To deploy using Docker:
```bash
docker build -t uci-cycling-app .
docker run -p 3000:3000 uci-cycling-app
```

### Portainer Deployment

1. Create a new stack in Portainer
2. Copy the contents of `docker-compose.yml` into the stack configuration
3. Deploy the stack

## Data Sources

The application is designed to fetch real data from UCI APIs. In this implementation, mock data is used for demonstration purposes. In a production environment, actual UCI API endpoints would be integrated.

## Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory for any necessary environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Author

UCI Cycling Data Team