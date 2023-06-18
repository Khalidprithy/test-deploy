import prisma from '../../prisma/index.js';
import { updateObject } from '../helpers/updateObject.js';

// Post app settings
export const postAppSettings = async (req, res) => {
    console.log('Inside post app settings');

    const appSettingsData = req.body;

    let androidSettingsData = { ...appSettingsData.androidSettings };
    let iosSettingsData = { ...appSettingsData.iosSettings };

    try {
        const createdAppSettings = await prisma.AppSettings.create({
            data: {
                notificationType: appSettingsData?.notificationType,
                oneSignalAppID: appSettingsData?.oneSignalAppID,
                oneSignalApiKey: appSettingsData?.oneSignalApiKey,
                firebaseServerKey: appSettingsData?.firebaseServerKey,
                firebaseTopics: appSettingsData?.firebaseTopics,
                sportsApiBasedUrl: appSettingsData?.sportsApiBasedUrl,
                sportsApiKey: appSettingsData?.sportsApiKey,
                androidSettings: androidSettingsData,
                iosSettings: iosSettingsData
            }
        });
        return res.status(200).send({ message: 'App setting posted', createdAppSettings });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to post app settingss, Try again' });
    }
};

// Get app settings
export const getAppSettings = async (req, res) => {
    try {
        const appSettings = await prisma.AppSettings.findMany();
        return res.status(200).send(appSettings);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch app settings, Try again' });
    }
};

// Update General App Settings
export const updateAppSettings = async (req, res) => {
    console.log('Inside update app settings');

    const updatedAppSettingsData = req.body;
    const { androidSettings, iosSettings } = updatedAppSettingsData;

    // fetch old app settings data
    const dbAppSettings = await prisma.AppSettings.findUnique({
        where: { name: 'appsettings' }
    });
    const oldAndroidSettings = dbAppSettings.androidSettings;
    const oldIosSettings = dbAppSettings.iosSettings;
    let latestAndSettings = updateObject(oldAndroidSettings, androidSettings);
    let latestIosSettings = updateObject(oldIosSettings, iosSettings);

    try {
        const updatedAppSettings = await prisma.AppSettings.update({
            where: { name: 'appsettings' },
            data: {
                notificationType: updatedAppSettingsData?.notificationType,
                oneSignalAppID: updatedAppSettingsData?.oneSignalAppID,
                oneSignalApiKey: updatedAppSettingsData?.oneSignalApiKey,
                firebaseServerKey: updatedAppSettingsData?.firebaseServerKey,
                firebaseTopics: updatedAppSettingsData?.firebaseTopics,
                sportsApiBasedUrl: updatedAppSettingsData?.sportsApiBasedUrl,
                sportsApiKey: updatedAppSettingsData?.sportsApiKey,
                androidSettings: latestAndSettings,
                iosSettings: latestIosSettings
            }
        });

        return res.status(200).send({ message: 'App settings updated', updatedAppSettings });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to update app settings, Try again' });
    }
};
