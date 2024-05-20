const express = require('express');
const {
  postProperty,
  viewProperties,
  viewPropertyDetails,
  likeProperty,
  interestedInProperty,
} = require('../controllers/propertyController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, postProperty);
router.get('/', viewProperties);
router.get('/:id', authenticateToken, viewPropertyDetails);
router.post('/:id/like', authenticateToken, likeProperty);
router.post('/:id/interested', authenticateToken, interestedInProperty);

module.exports = router;
