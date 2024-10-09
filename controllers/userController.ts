import { Request, Response } from 'express';

export const getAllUser = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'get all users',
    });
};

export const createNewUser = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Creating new user',
    });
};

export const getUserById = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'get user',
    });
};

export const updateUser = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Updating a user',
    });
};

export const deleteUser = (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Delete user',
    });
};
