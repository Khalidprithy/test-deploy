import express from 'express';
import { Login, createUser } from '../controllers/Auth.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', Login);
router.post('/user/:id', createUser);

export default router;
