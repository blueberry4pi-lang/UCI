const axios = require('axios');
require('dotenv').config();

class RaceDataService {
  constructor() {
    // In a real implementation, we would use actual UCI API endpoints
    // For now, we'll create mock data that simulates what we'd get from real APIs
    this.races = [];
    this.raceData = {
      mens: [],
      womens: []
    };
  }

  /**
   * Fetch UCI race data from APIs (simulated in this implementation)
   * In a real implementation, this would call actual UCI APIs
   */
  async fetchRaceData() {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock UCI race data - this would be replaced with actual API calls
      const mockMensRaces = [
        {
          id: 1,
          name: "Tour de France",
          type: "Grand Tour",
          date: "2026-07-01",
          location: "France",
          prestige: "high",
          category: "Mens"
        },
        {
          id: 2,
          name: "Tour of Flanders",
          type: "One Day Race",
          date: "2026-04-19",
          location: "Belgium",
          prestige: "high",
          category: "Mens"
        },
        {
          id: 3,
          name: "Tour de Romandie",
          type: "Tour",
          date: "2026-04-20",
          location: "Switzerland",
          prestige: "medium",
          category: "Mens"
        }
      ];

      const mockWomensRaces = [
        {
          id: 1,
          name: "Tour de France Femmes",
          type: "Grand Tour",
          date: "2026-07-01",
          location: "France",
          prestige: "high",
          category: "Womens"
        },
        {
          id: 2,
          name: "Tour of Flanders Women",
          type: "One Day Race",
          date: "2026-04-19",
          location: "Belgium",
          prestige: "high",
          category: "Womens"
        }
      ];

      this.raceData.mens = mockMensRaces;
      this.raceData.womens = mockWomensRaces;

      // Combine all races
      this.races = [...mockMensRaces, ...mockWomensRaces];

      console.log('Successfully fetched race data');
      return this.races;
    } catch (error) {
      console.error('Error fetching race data:', error);
      throw error;
    }
  }

  /**
   * Get all races
   */
  getAllRaces() {
    return this.races;
  }

  /**
   * Get races by category (men or women)
   */
  getRacesByCategory(category) {
    return this.raceData[category.toLowerCase()] || [];
  }

  /**
   * Get the next race (closest upcoming race)
   */
  getNextRace() {
    const now = new Date();
    const sortedRaces = this.races
      .filter(race => new Date(race.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedRaces.length > 0 ? sortedRaces[0] : null;
  }

  /**
   * Get races by prestige level
   */
  getRacesByPrestige(prestigeLevel) {
    return this.races.filter(race => race.prestige === prestigeLevel);
  }

  /**
   * Get upcoming races (next 7 days)
   */
  getUpcomingRaces(days = 7) {
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + days);

    return this.races
      .filter(race => {
        const raceDate = new Date(race.date);
        return raceDate >= now && raceDate <= futureDate;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }
}

module.exports = new RaceDataService();