const express = require('express');
const router = express.Router();
const { getBugsReport } = require('../controllers/bugController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Only admin can see bugs
router.get('/admin/bugs', authMiddleware, roleMiddleware, getBugsReport);

module.exports = router;
