import express from 'express';
import {
    deleteUser,
    findAllUser,
    findUser,
    updateUser,
    updateUserAdmin
} from '../controllers/User.js';

const router = express.Router();

router.get('/users', findAllUser);
router.get('/user/:id', findUser);
router.put('/user/:id', updateUser);
router.put('/admin/user/:id', updateUserAdmin);
router.delete('/user/:id', deleteUser);

export default router;
