const raceDataService = require('./raceDataService');

class CountdownService {
  /**
   * Calculate time remaining until next race
   */
  calculateTimeRemaining(nextRace) {
    if (!nextRace) {
      return null;
    }

    const now = new Date();
    const raceDate = new Date(nextRace.date);

    // Calculate difference in milliseconds
    const diff = raceDate - now;

    // Convert to days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      totalMilliseconds: diff
    };
  }

  /**
   * Get countdown to next race
   */
  getNextRaceCountdown() {
    const nextRace = raceDataService.getNextRace();
    const timeRemaining = this.calculateTimeRemaining(nextRace);

    return {
      nextRace,
      timeRemaining
    };
  }

  /**
   * Get countdown to specific race
   */
  getRaceCountdown(raceName) {
    const races = raceDataService.getAllRaces();
    const race = races.find(r => r.name === raceName);

    if (!race) {
      return null;
    }

    const timeRemaining = this.calculateTimeRemaining(race);

    return {
      race,
      timeRemaining
    };
  }
}

module.exports = new CountdownService();