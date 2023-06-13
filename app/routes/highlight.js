import express from 'express';
import {
    createHighlight,
    deleteHighlight,
    getAllHighlight,
    getSingleHighlight,
    updateHighlight
} from '../controllers/Highlight.js';

const router = express.Router();

router.post('/highlight', createHighlight);
router.get('/highlights', getAllHighlight);
router.get('/highlight/:id', getSingleHighlight);
router.put('/highlight/:id', updateHighlight);
router.delete('/highlight/:id', deleteHighlight);

export default router;
