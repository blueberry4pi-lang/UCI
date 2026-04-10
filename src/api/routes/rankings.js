const express = require('express');
const router = express.Router();
const rankingService = require('../../../services/rankingService');

// Get men's UCI rankings
router.get('/mens', (req, res) => {
  try {
    const rankings = rankingService.getMensRankings();
    res.json({
      success: true,
      data: rankings,
      count: rankings.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching men\'s rankings',
      error: error.message
    });
  }
});

// Get women's UCI rankings
router.get('/womens', (req, res) => {
  try {
    const rankings = rankingService.getWomensRankings();
    res.json({
      success: true,
      data: rankings,
      count: rankings.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching women\'s rankings',
      error: error.message
    });
  }
});

// Get team rankings
router.get('/teams', (req, res) => {
  try {
    const rankings = rankingService.getTeamRankings();
    res.json({
      success: true,
      data: rankings,
      count: rankings.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team rankings',
      error: error.message
    });
  }
});

// Get specific rider ranking
router.get('/rider/:name', (req, res) => {
  try {
    const { name } = req.params;
    const ranking = rankingService.getRiderRanking(name);

    if (ranking) {
      res.json({
        success: true,
        data: ranking
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Rider not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rider ranking',
      error: error.message
    });
  }
});

// Get specific team ranking
router.get('/team/:name', (req, res) => {
  try {
    const { name } = req.params;
    const ranking = rankingService.getTeamRanking(name);

    if (ranking) {
      res.json({
        success: true,
        data: ranking
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team ranking',
      error: error.message
    });
  }
});

module.exports = router;