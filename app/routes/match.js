import express from 'express';
import { createLiveMatch, getAllMatches, getAllStreams, getSingleMatche } from '../controllers/LiveMatch.js';

const router = express.Router();

router.post('/match', createLiveMatch);
router.get('/match', getAllMatches);
router.get('/streams', getAllStreams);
router.get('/match/:id', getSingleMatche);

export default router;
