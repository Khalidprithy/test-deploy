import express from 'express';
import { getFixture } from '../controllers/Fixture.js';

const router = express.Router();

router.get('/fixtures/date/:dateData', getFixture);

export default router;
