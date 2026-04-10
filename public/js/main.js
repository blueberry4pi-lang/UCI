// DOM Elements
const racesDisplay = document.getElementById('races-display');
const countdownDisplay = document.getElementById('countdown-display');
const rankingsDisplay = document.getElementById('rankings-display');
const tabButtons = document.querySelectorAll('.tab-btn');

// Current active tab
let activeTab = 'mens';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeTab = button.dataset.tab;

            // Reload rankings
            loadRankings();
        });
    });
}

// Load all data
async function loadData() {
    try {
        // Load countdown
        await loadCountdown();

        // Load races
        await loadRaces();

        // Load rankings
        await loadRankings();

    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load data. Please try again later.');
    }
}

// Load countdown to next race
async function loadCountdown() {
    try {
        const response = await fetch('/api/countdown/next');
        const data = await response.json();

        if (data.success && data.data.nextRace) {
            displayCountdown(data.data);
        } else {
            countdownDisplay.innerHTML = '<p>No upcoming races found.</p>';
        }
    } catch (error) {
        console.error('Error loading countdown:', error);
        countdownDisplay.innerHTML = '<p>Error loading countdown.</p>';
    }
}

// Display countdown
function displayCountdown(countdownData) {
    const { nextRace, timeRemaining } = countdownData;

    if (!timeRemaining) {
        countdownDisplay.innerHTML = `<p>No upcoming races found.</p>`;
        return;
    }

    const { days, hours, minutes, seconds } = timeRemaining;

    let countdownHTML = `
        <h3>${nextRace.name}</h3>
        <p class="race-date">${formatDate(nextRace.date)} - ${nextRace.location}</p>
        <p>Countdown:</p>
        <div class="countdown-timer">
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        </div>
    `;

    countdownDisplay.innerHTML = countdownHTML;
}

// Load races
async function loadRaces() {
    try {
        const response = await fetch('/api/races');
        const data = await response.json();

        if (data.success) {
            displayRaces(data.data);
        } else {
            racesDisplay.innerHTML = '<p>Error loading races.</p>';
        }
    } catch (error) {
        console.error('Error loading races:', error);
        racesDisplay.innerHTML = '<p>Error loading races.</p>';
    }
}

// Display races
function displayRaces(races) {
    if (races.length === 0) {
        racesDisplay.innerHTML = '<p>No races found.</p>';
        return;
    }

    // Sort races by date
    const sortedRaces = races.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get upcoming races (next 30 days)
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + 30);

    const upcomingRaces = sortedRaces.filter(race => {
        const raceDate = new Date(race.date);
        return raceDate >= now && raceDate <= futureDate;
    });

    let racesHTML = '';

    if (upcomingRaces.length === 0) {
        racesHTML = '<p>No upcoming races found.</p>';
    } else {
        racesHTML = '<div class="races-grid">';
        upcomingRaces.forEach(race => {
            const prestigeClass = `prestige-${race.prestige}`;
            racesHTML += `
                <div class="race-card ${prestigeClass}">
                    <h3>${race.name}</h3>
                    <p><span class="race-date">${formatDate(race.date)}</span></p>
                    <p><strong>Location:</strong> ${race.location}</p>
                    <p><strong>Type:</strong> ${race.type}</p>
                    <p><strong>Prestige:</strong> ${race.prestige}</p>
                </div>
            `;
        });
        racesHTML += '</div>';
    }

    racesDisplay.innerHTML = racesHTML;
}

// Load rankings
async function loadRankings() {
    try {
        let response;
        let rankings = [];

        switch (activeTab) {
            case 'mens':
                response = await fetch('/api/rankings/mens');
                break;
            case 'womens':
                response = await fetch('/api/rankings/womens');
                break;
            case 'teams':
                response = await fetch('/api/rankings/teams');
                break;
            default:
                response = await fetch('/api/rankings/mens');
        }

        const data = await response.json();

        if (data.success) {
            rankings = data.data;
            displayRankings(rankings);
        } else {
            rankingsDisplay.innerHTML = '<p>Error loading rankings.</p>';
        }
    } catch (error) {
        console.error('Error loading rankings:', error);
        rankingsDisplay.innerHTML = '<p>Error loading rankings.</p>';
    }
}

// Display rankings
function displayRankings(rankings) {
    let rankingsHTML = '';

    if (rankings.length === 0) {
        rankingsHTML = '<p>No rankings found.</p>';
    } else {
        rankingsHTML = `
            <table class="rankings-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Rider/Team</th>
                        <th>Team/Nationality</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
        `;

        rankings.forEach(item => {
            rankingsHTML += `
                <tr>
                    <td class="position">${item.position}</td>
                    <td>${item.rider || item.team}</td>
                    <td>${item.team ? item.team : item.nationality}</td>
                    <td>${item.points}</td>
                </tr>
            `;
        });

        rankingsHTML += `
                </tbody>
            </table>
        `;
    }

    rankingsDisplay.innerHTML = rankingsHTML;
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Helper function to show error
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);

    // Remove error after 5 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}