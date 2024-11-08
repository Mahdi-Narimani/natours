import express from 'express';
import {
    createNewTour,
    deleteTour,
    getAllTours,
    getTourById,
    updateTour,
} from '../controllers/tourController';

import {
    checkId,
    checkBody,
    aliasTopTours,
} from '../middlewares/tour.middleware';

const router = express.Router();

router.param('id', checkId);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(getAllTours).post(checkBody, createNewTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default router;
