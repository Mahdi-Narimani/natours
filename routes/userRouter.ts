import express from 'express';
import {
    deleteUser,
    getAllUser,
    getUserById,
    updateUser,
} from '../controllers/userController';

const router = express.Router();

router.route('/').get(getAllUser).post();

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
