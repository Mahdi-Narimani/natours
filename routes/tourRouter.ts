import express from 'express';
import {
    createNewTour,
    deleteTour,
    getAllTours,
    getTourById,
    updateTour,
    checkId,
    checkBody,
} from '../controllers/tourController';

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody, createNewTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default router;
