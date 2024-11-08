import { NextFunction, Request, Response } from 'express';
import Tour from '../Models/tour.model';

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name || !req.body.price) {
        res.status(404).json({
            status: 'bad request',
            message: 'Name and price must not be empty',
        });
    } else {
        next();
    }
};

export const checkId = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const toursNum: number = await Tour.countDocuments();

    if (+req.params.id > toursNum) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    } else {
        next();
    }
};

export const aliasTopTours = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};
