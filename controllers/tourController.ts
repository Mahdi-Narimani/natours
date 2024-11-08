import { query, Request, Response } from 'express';
import Tour from '../Models/tour.model';
import APIFeatures from '../utils/apiFeatures';

export const getAllTours = async (req: Request, res: Response) => {
    try {
        // * Execute Query
        const features = new APIFeatures(Tour.find(), req.query as any)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            result: tours.length,
            data: { tours },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An internal server error occurred: ' + error,
        });
    }
};

export const createNewTour = async (req: Request, res: Response) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { tours: newTour },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data provided: ' + error,
        });
    }
};

export const getTourById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tourById = await Tour.findById(id);

        if (!tourById) {
            return res.status(404).json({
                status: 'fail',
                message: 'Resource with the specified ID not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: { tour: tourById },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An internal server error occurred: ' + error,
        });
    }
};

export const updateTour = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedTour) {
            return res.status(404).json({
                status: 'fail',
                message: 'Resource with the specified ID not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: { tour: updatedTour },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid update data: ' + error,
        });
    }
};

export const deleteTour = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({
                status: 'fail',
                message: 'Resource with the specified ID not found',
            });
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An internal server error occurred: ' + error,
        });
    }
};
