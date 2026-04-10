const express = require('express');
const router = express.Router();
const countdownService = require('../../../services/countdownService');

// Get countdown to next race
router.get('/next', (req, res) => {
  try {
    const countdown = countdownService.getNextRaceCountdown();
    res.json({
      success: true,
      data: countdown
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching next race countdown',
      error: error.message
    });
  }
});

// Get countdown to specific race
router.get('/race/:name', (req, res) => {
  try {
    const { name } = req.params;
    const countdown = countdownService.getRaceCountdown(name);

    if (countdown) {
      res.json({
        success: true,
        data: countdown
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Race not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching race countdown',
      error: error.message
    });
  }
});

module.exports = router;