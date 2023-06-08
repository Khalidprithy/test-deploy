import express from 'express';
import { findAllUser, findUser } from '../controllers/User.js';

const router = express.Router();

router.get('/users', findAllUser);
router.get('/user/:id', findUser);

export default router;
