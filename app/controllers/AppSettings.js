import prisma from '../../prisma/index.js';

// Post app settings
export const postAppSettings = async (req, res) => {
    console.log('Inside post app settings');

    const appSettingsData = req.body;

    const {
        androidPrivacyPolicy,
        androidTermsAndCondition,
        androidAppShareLink,
        androidAppDefalutPage,
        androidAppPublishControl,
        androidHideLiveByVersionCode,
        androidAdsType,
        androidClickControl,
        androidGoogleAppId,
        androidGoogleAppOpenAddCode,
        androidGoogleBannerAdsCode,
        androidGoogleInterstitialAdsCode,
        androidGoogleNativeAdsCode,
        androidGoogleRewardedAdsCode,
        androidVersionName,
        androidVersionCode,
        androidForceUpdate,
        androidAppUrl,
        androidButtonText,
        androidDescription
    } = appSettingsData.androidSettings;

    const {
        iosPrivacyPolicy,
        iosTermsAndCondition,
        iosAppShareLink,
        iosAppRatingLink,
        iosAppDefalutPage,
        iosAppPublishControl,
        iosHideLiveByVersionCode,
        iosAdsType,
        iosClickControl,
        iosGoogleAppId,
        iosGoogleAppOpenAddCode,
        iosGoogleBannerAdsCode,
        iosGoogleInterstitialAdsCode,
        iosGoogleNativeAdsCode,
        iosGoogleRewardedAdsCode,
        iosVersionName,
        iosVersionCode,
        iosForceUpdate,
        iosAppUrl,
        iosButtonText,
        iosDescription
    } = appSettingsData.iosSettings;

    let androidSettingsData = {
        androidPrivacyPolicy,
        androidTermsAndCondition,
        androidAppShareLink,
        androidAppDefalutPage,
        androidAppPublishControl,
        androidHideLiveByVersionCode,
        androidAdsType,
        androidClickControl,
        androidGoogleAppId,
        androidGoogleAppOpenAddCode,
        androidGoogleBannerAdsCode,
        androidGoogleInterstitialAdsCode,
        androidGoogleNativeAdsCode,
        androidGoogleRewardedAdsCode,
        androidVersionName,
        androidVersionCode,
        androidForceUpdate,
        androidAppUrl,
        androidButtonText,
        androidDescription
    };

    let iosSettingsData = {
        iosPrivacyPolicy,
        iosTermsAndCondition,
        iosAppShareLink,
        iosAppRatingLink,
        iosAppDefalutPage,
        iosAppPublishControl,
        iosHideLiveByVersionCode,
        iosAdsType,
        iosClickControl,
        iosGoogleAppId,
        iosGoogleAppOpenAddCode,
        iosGoogleBannerAdsCode,
        iosGoogleInterstitialAdsCode,
        iosGoogleNativeAdsCode,
        iosGoogleRewardedAdsCode,
        iosVersionName,
        iosVersionCode,
        iosForceUpdate,
        iosAppUrl,
        iosButtonText,
        iosDescription
    };

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

    const dbAppSettings = await prisma.AppSettings.findUnique({
        where: { name: 'appsettings' }
    });

    const newAndroidSettings = dbAppSettings.androidSettings;
    const newIosSettings = dbAppSettings.iosSettings;

    let finalAndroidSettings;
    let finalIosSettings;

    if (dbAppSettings !== null) {
        finalAndroidSettings = {
            ...newAndroidSettings,
            androidPrivacyPolicy: androidSettings?.androidPrivacyPolicy || newAndroidSettings?.androidPrivacyPolicy,
            androidTermsAndCondition: androidSettings?.androidTermsAndCondition || newAndroidSettings?.androidPrivacyPolicy,
            androidAppShareLink: androidSettings?.androidAppShareLink || newAndroidSettings?.androidPrivacyPolicy,
            androidAppDefalutPage: androidSettings?.androidAppDefalutPage || newAndroidSettings?.androidPrivacyPolicy,
            androidAppPublishControl: androidSettings?.androidAppPublishControl || newAndroidSettings?.androidPrivacyPolicy,
            androidHideLiveByVersionCode: androidSettings?.androidHideLiveByVersionCode || newAndroidSettings?.androidPrivacyPolicy,
            androidAdsType: androidSettings?.androidAdsType || newAndroidSettings?.androidPrivacyPolicy,
            androidClickControl: androidSettings?.androidClickControl || newAndroidSettings?.androidPrivacyPolicy,
            androidGoogleAppId: androidSettings?.androidGoogleAppId || newAndroidSettings?.androidPrivacyPolicy,
            androidGoogleAppOpenAddCode: androidSettings?.androidGoogleAppOpenAddCode || newAndroidSettings?.androidPrivacyPolicy,
            androidGoogleBannerAdsCode: androidSettings?.androidGoogleBannerAdsCode || newAndroidSettings?.androidPrivacyPolicy,
            androidGoogleInterstitialAdsCode: androidSettings?.androidGoogleInterstitialAdsCode || newAndroidSettings?.androidPrivacyPolicy,
            androidGoogleNativeAdsCode: androidSettings?.androidGoogleNativeAdsCode || newAndroidSettings?.androidPrivacyPolicy,
            androidGoogleRewardedAdsCode: androidSettings?.androidGoogleRewardedAdsCode || newAndroidSettings?.androidPrivacyPolicy,
            androidVersionName: androidSettings?.androidVersionName || newAndroidSettings?.androidPrivacyPolicy,
            androidVersionCode: androidSettings?.androidVersionCode || newAndroidSettings?.androidPrivacyPolicy,
            androidForceUpdate: androidSettings?.androidForceUpdate || newAndroidSettings?.androidPrivacyPolicy,
            androidAppUrl: androidSettings?.androidAppUrl || newAndroidSettings?.androidPrivacyPolicy,
            androidButtonText: androidSettings?.androidButtonText || newAndroidSettings?.androidPrivacyPolicy,
            androidDescription: androidSettings?.androidDescription || newAndroidSettings?.androidPrivacyPolicy
        };
    }

    if (dbAppSettings !== null) {
        finalIosSettings = {
            ...newAndroidSettings,
            iosPrivacyPolicy: iosSettings?.iosPrivacyPolicy || newIosSettings?.iosPrivacyPolicy,
            iosTermsAndCondition: iosSettings?.iosTermsAndCondition || newIosSettings?.iosTermsAndCondition,
            iosAppShareLink: iosSettings?.iosAppShareLink || newIosSettings?.iosAppShareLink,
            iosAppRatingLink: iosSettings?.iosAppRatingLink || newIosSettings?.iosAppRatingLink,
            iosAppDefalutPage: iosSettings?.iosAppDefalutPage || newIosSettings?.iosAppDefalutPage,
            iosAppPublishControl: iosSettings?.iosAppPublishControl || newIosSettings?.iosAppPublishControl,
            iosHideLiveByVersionCode: iosSettings?.iosHideLiveByVersionCode || newIosSettings?.iosHideLiveByVersionCode,
            iosAdsType: iosSettings?.iosAdsType || newIosSettings?.iosAdsType,
            iosClickControl: iosSettings?.iosClickControl || newIosSettings?.iosClickControl,
            iosGoogleAppId: iosSettings?.iosGoogleAppId || newIosSettings?.iosGoogleAppId,
            iosGoogleAppOpenAddCode: iosSettings?.iosGoogleAppOpenAddCode || newIosSettings?.iosGoogleAppOpenAddCode,
            iosGoogleBannerAdsCode: iosSettings?.iosGoogleBannerAdsCode || newIosSettings?.iosGoogleBannerAdsCode,
            iosGoogleInterstitialAdsCode: iosSettings?.iosGoogleInterstitialAdsCode || newIosSettings?.iosGoogleInterstitialAdsCode,
            iosGoogleNativeAdsCode: iosSettings?.iosGoogleNativeAdsCode || newIosSettings?.iosGoogleNativeAdsCode,
            iosGoogleRewardedAdsCode: iosSettings?.iosGoogleRewardedAdsCode || newIosSettings?.iosGoogleRewardedAdsCode,
            iosVersionName: iosSettings?.iosVersionName || newIosSettings?.iosVersionName,
            iosVersionCode: iosSettings?.iosVersionCode || newIosSettings?.iosVersionCode,
            iosForceUpdate: iosSettings?.iosForceUpdate || newIosSettings?.iosForceUpdate,
            iosAppUrl: iosSettings?.iosAppUrl || newIosSettings?.iosAppUrl,
            iosButtonText: iosSettings?.iosButtonText || newIosSettings?.iosButtonText,
            iosDescription: iosSettings?.iosDescription || newIosSettings?.iosDescription
        };
    }

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
                androidSettings: finalAndroidSettings,
                iosSettings: finalIosSettings
            }
        });

        console.log(updatedAppSettings);

        return res.status(200).send({ message: 'App settings updated', updatedAppSettings });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to update app settingss, Try again' });
    }
};

// // Update Android Settings
// export const updateAndroidSettings = async (req, res) => {
//     console.log('Inside update Android settings');
//     const id = req.params.id;
//     const updatedAndroidSettingsData = req.body;

//     try {
//         const updatedAndroidSettings = await prisma.AndroidSettings.update({
//             where: { id: id },
//             data: {
//                 privacyPolicy: updatedAndroidSettingsData.privacyPolicy,
//                 termsAndCondition: updatedAndroidSettingsData.termsAndCondition,
//                 appShareLink: updatedAndroidSettingsData.appShareLink,
//                 appDefalutPage: updatedAndroidSettingsData.appDefalutPage,
//                 appPublishControl: updatedAndroidSettingsData.appPublishControl,
//                 hideLiveByVersionCode: updatedAndroidSettingsData.hideLiveByVersionCode,
//                 adsType: updatedAndroidSettingsData.adsType,
//                 clickControl: updatedAndroidSettingsData.clickControl,
//                 googleAppId: updatedAndroidSettingsData.googleAppId,
//                 googleAppOpenAddCode: updatedAndroidSettingsData.googleAppOpenAddCode,
//                 googleBannerAdsCode: updatedAndroidSettingsData.googleBannerAdsCode,
//                 googleInterstitialAdsCode: updatedAndroidSettingsData.googleInterstitialAdsCode,
//                 googleNativeAdsCode: updatedAndroidSettingsData.googleNativeAdsCode,
//                 googleRewardedAdsCode: updatedAndroidSettingsData.googleRewardedAdsCode,
//                 versionName: updatedAndroidSettingsData.versionName,
//                 versionCode: updatedAndroidSettingsData.versionCode,
//                 forceUpdate: updatedAndroidSettingsData.forceUpdate,
//                 appUrl: updatedAndroidSettingsData.appUrl,
//                 buttonText: updatedAndroidSettingsData.buttonText,
//                 description: updatedAndroidSettingsData.description
//             }
//         });

//         console.log(updatedAndroidSettings);

//         return res
//             .status(200)
//             .send({ message: 'Android settings updated', updatedAndroidSettings });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: 'Failed to update Android settingss, Try again' });
//     }
// };

// // Update Ios Settings
// export const updateIosSettings = async (req, res) => {
//     console.log('Inside update Ios settings');
//     const id = req.params.id;
//     const updatedIosSettingsData = req.body;

//     try {
//         const updatedIosSettings = await prisma.IosSettings.update({
//             where: { id: id },
//             data: {
//                 privacyPolicy: updatedIosSettingsData.privacyPolicy,
//                 termsAndCondition: updatedIosSettingsData.termsAndCondition,
//                 appShareLink: updatedIosSettingsData.appShareLink,
//                 appRatingLink: updatedIosSettingsData.appRatingLink,
//                 appDefalutPage: updatedIosSettingsData.appDefalutPage,
//                 appPublishControl: updatedIosSettingsData.appPublishControl,
//                 hideLiveByVersionCode: updatedIosSettingsData.hideLiveByVersionCode,
//                 adsType: updatedIosSettingsData.adsType,
//                 clickControl: updatedIosSettingsData.clickControl,
//                 googleAppId: updatedIosSettingsData.googleAppId,
//                 googleAppOpenAddCode: updatedIosSettingsData.googleAppOpenAddCode,
//                 googleBannerAdsCode: updatedIosSettingsData.googleBannerAdsCode,
//                 googleInterstitialAdsCode: updatedIosSettingsData.googleInterstitialAdsCode,
//                 googleNativeAdsCode: updatedIosSettingsData.googleNativeAdsCode,
//                 googleRewardedAdsCode: updatedIosSettingsData.googleRewardedAdsCode,
//                 versionName: updatedIosSettingsData.versionName,
//                 versionCode: updatedIosSettingsData.versionCode,
//                 forceUpdate: updatedIosSettingsData.forceUpdate,
//                 appUrl: updatedIosSettingsData.appUrl,
//                 buttonText: updatedIosSettingsData.buttonText,
//                 description: updatedIosSettingsData.description
//             }
//         });

//         console.log(updatedIosSettings);

//         return res.status(200).send({ message: 'Ios settings updated', updatedIosSettings });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: 'Failed to update Ios settingss, Try again' });
//     }
// };
