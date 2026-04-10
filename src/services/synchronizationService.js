const cron = require('node-cron');
const raceDataService = require('./raceDataService');
const fs = require('fs').promises;
const path = require('path');

class SynchronizationService {
  constructor() {
    this.isRunning = false;
  }

  /**
   * Initialize the synchronization service
   */
  initialize() {
    // Schedule daily synchronization at 2 AM
    cron.schedule('0 2 * * *', async () => {
      await this.syncData();
    });

    console.log('Synchronization service initialized');
  }

  /**
   * Perform data synchronization
   */
  async syncData() {
    if (this.isRunning) {
      console.log('Synchronization already in progress');
      return;
    }

    this.isRunning = true;
    console.log('Starting daily synchronization...');

    try {
      // Fetch fresh data from UCI APIs
      await raceDataService.fetchRaceData();

      console.log('Daily synchronization completed successfully');
    } catch (error) {
      console.error('Error during synchronization:', error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Force immediate data synchronization
   */
  async forceSync() {
    console.log('Forcing immediate synchronization...');
    await this.syncData();
  }

  /**
   * Get synchronization status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastSync: new Date().toISOString()
    };
  }
}

module.exports = new SynchronizationService();