const dbObj = {
    androidPrivacyPolicy: 'your_privacy_policy',
    androidTermsAndCondition: 'your_terms_and_condition',
    androidAppShareLink: 'your_app_share_link',
    androidAppDefalutPage: 'your_app_default_page',
    androidAppPublishControl: true,
    androidHideLiveByVersionCode: 1,
    androidAdsType: 'your_ads_type',
    androidClickControl: 1,
    androidGoogleAppId: 'your_google_app_id',
    androidGoogleAppOpenAddCode: 'your_google_app_open_add_code',
    androidGoogleBannerAdsCode: 'your_google_banner_ads_code',
    androidGoogleInterstitialAdsCode: 'your_google_interstitial_ads_code',
    androidGoogleNativeAdsCode: 'your_google_native_ads_code',
    androidGoogleRewardedAdsCode: 'your_google_rewarded_ads_code',
    androidVersionName: 'your_version_name',
    androidVersionCode: 'your_version_code',
    androidForceUpdate: true,
    androidAppUrl: 'your_app_url',
    androidButtonText: 'your_button_text',
    androidDescription: 'your_description'
};

let newObj = {
    androidPrivacyPolicy: 'new data',
    androidTermsAndCondition: 'new again',
    androidAppShareLink: 'White elephent',
    androidAppDefalutPage: 'your_app_default_page Updated',
    androidAppPublishControl: 'off',
    androidHideLiveByVersionCode: 6,
    androidForceUpdate: 'yes'
};

function update(dbObj, newObj) {
    const newData = Object.entries(dbObj);

    newData.forEach(item => {
        const key = item[0];
        const value = item[1];

        if (newObj.hasOwnProperty(key)) {
            dbObj[key] = newObj[key];
        }
    });

    console.log('Updated dbObj:', dbObj);
}

update(dbObj, newObj);
