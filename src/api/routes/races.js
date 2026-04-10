const express = require('express');
const router = express.Router();
const raceDataService = require('../../../services/raceDataService');

// Get all races
router.get('/', (req, res) => {
  try {
    const races = raceDataService.getAllRaces();
    res.json({
      success: true,
      data: races,
      count: races.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching races',
      error: error.message
    });
  }
});

// Get races by category (men/women)
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const races = raceDataService.getRacesByCategory(category);
    res.json({
      success: true,
      data: races,
      count: races.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching races by category',
      error: error.message
    });
  }
});

// Get next race
router.get('/next', (req, res) => {
  try {
    const nextRace = raceDataService.getNextRace();
    res.json({
      success: true,
      data: nextRace
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching next race',
      error: error.message
    });
  }
});

// Get races by prestige level
router.get('/prestige/:prestige', (req, res) => {
  try {
    const { prestige } = req.params;
    const races = raceDataService.getRacesByPrestige(prestige);
    res.json({
      success: true,
      data: races,
      count: races.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching races by prestige',
      error: error.message
    });
  }
});

// Get upcoming races
router.get('/upcoming', (req, res) => {
  try {
    const days = req.query.days || 7;
    const races = raceDataService.getUpcomingRaces(parseInt(days));
    res.json({
      success: true,
      data: races,
      count: races.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming races',
      error: error.message
    });
  }
});

module.exports = router;