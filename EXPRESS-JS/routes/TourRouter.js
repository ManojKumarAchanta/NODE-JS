const express = require('express');
const router = express.Router();

const {
  getAllTours,
  getTourById,
  createNewTour,
  updateTour,
  deleteTour
} = require('../controllers/TourController');

router.route('/').get(getAllTours).post(createNewTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
