import express from 'express';
import {
    deleteUser,
    getAllUser,
    getUserById,
    updateUser,
} from '../controllers/user.controller';
import { signup } from '../controllers/authentication/auth.controller';

const router = express.Router();

router.post('/signup', signup);

router.route('/').get(getAllUser).post();

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
