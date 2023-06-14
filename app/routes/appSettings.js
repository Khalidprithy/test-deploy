import express from 'express';
import { getAppSettings, postAppSettings, updateAppSettings } from '../controllers/AppSettings.js';

const router = express.Router();

router.post('/app_settings', postAppSettings);
router.get('/app_settings', getAppSettings);
router.put('/app_settings', updateAppSettings);
// router.put('/app_settings/android/:id', updateAndroidSettings);
// router.put('/app_settings/ios/:id', updateIosSettings);

export default router;
