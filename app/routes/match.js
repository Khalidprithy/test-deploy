import express from 'express';
import { createLiveMatch } from '../controllers/LiveMatch.js';

const router = express.Router();

router.post('/match', createLiveMatch);

export default router;
