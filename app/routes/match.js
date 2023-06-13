import express from 'express';
import {
    createLiveMatch,
    deleteOneMatche,
    getAllMatches,
    getAllStreams,
    getOneStream,
    getSingleMatche,
    updateMatch
} from '../controllers/LiveMatch.js';

const router = express.Router();

router.post('/match', createLiveMatch);
router.get('/match', getAllMatches);
router.put('/match/:id', updateMatch);
router.delete('/match/:id', deleteOneMatche);
router.get('/streams', getAllStreams);
router.get('/stream/:id', getOneStream);
router.get('/match/:id', getSingleMatche);

export default router;
