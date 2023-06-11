import express from 'express';
import { createLiveMatch, getAllMatches, getAllStreams, getSingleMatche, updateMatch } from '../controllers/LiveMatch.js';

const router = express.Router();

router.post('/match', createLiveMatch);
router.get('/match', getAllMatches);
router.put('/match/:id', updateMatch);
router.get('/streams', getAllStreams);
router.get('/match/:id', getSingleMatche);

export default router;
