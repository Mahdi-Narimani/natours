import { NextFunction, Request, Response } from 'express';
import fs from 'node:fs';

const tours: any[] = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
);

export const checkId = (req: Request, res: Response, next: NextFunction) => {
    if (+req.params.id > tours.length) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Id',
        });
    } else {
        next();
    }
};

// * Create a check body middleware
// * Check if body contains the name and price property
// * If not, send back 404(bad request)
// * Add it to the post handler stack

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

export const getAllTours = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'successfully',
        result: tours.length,
        data: {
            tours,
        },
    });
};

export const createNewTour = (req: Request, res: Response) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err: NodeJS.ErrnoException | null) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Failed to write the file',
                });
            }
            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour,
                },
            });
        }
    );
};

export const getTourById = (req: Request, res: Response) => {
    const { id } = req.params;
    const tour = tours.find((item) => item.id === +id);
    if (!tour) {
        res.status(404).json({ status: 'Not Found' });
    } else {
        res.status(200).json(tour);
    }
};

export const updateTour = (req: Request, res: Response) => {
    const id = +req.params.id;
    const newTour = req.body;

    if (id > tours.length) {
        res.status(404).json({
            status: 'Not Found',
            message: 'Invalid ID',
        });
    } else {
        const updateTours: any = tours.map((tour) =>
            tour.id === id ? { ...tour, ...newTour } : tour
        );

        fs.writeFile(
            `${__dirname}/dev-data/data/tours-simple.json`,
            JSON.stringify(updateTours),
            (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        message: 'Failed to write the file',
                    });
                }
            }
        );

        res.status(200).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    }
};

export const deleteTour = (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const finalResult = tours.filter((item) => item.id !== id);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(finalResult),
        (err: NodeJS.ErrnoException | null) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Failed to write the file',
                });
            }
        }
    );

    res.status(200).json({
        status: 'success',
        data: {
            tour: finalResult,
        },
    });
};
