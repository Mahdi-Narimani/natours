import express from 'express';
import {
    createNewTour,
    deleteTour,
    getAllTours,
    getMonthlyPlan,
    getTourById,
    getTourStats,
    updateTour,
} from '../controllers/tour.controller';

import {
    checkId,
    checkBody,
    aliasTopTours,
} from '../middlewares/tour.middleware';

const router = express.Router();

router.param('id', checkId);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(checkBody, createNewTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default router;
