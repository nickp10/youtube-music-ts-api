/*
* The defines the context object that needs to be sent with requests to the YouTube Music API.
*/
export default {
    context: {
        client: {
            hl: "en",
            gl: "US",
            clientName: "WEB_REMIX",
            clientVersion: "1.20241030.00.00-canary_experiment_1.20241028.01.00",
            musicAppInfo: {
                pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN",
                webDisplayMode: "WEB_DISPLAY_MODE_BROWSER",
                storeDigitalGoodsApiSupportStatus: {
                    playStoreDigitalGoodsApiSupportStatus: "DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED"
                }
            }
        },
        user: {
            lockedSafetyMode: false
        },
        request: {
            useSsl: true,
            internalExperimentFlags: [],
            innertubeTokenJar: {
                appTokens: [
                    {
                        type: 2,
                        value: "EicKI1FQdDJCRTZGbkp6b3hmcXhNUkR4bmRuTnlEUHU1cy04YVVlEAA=",
                        maxAgeSeconds: 86400,
                        creationTimeUsec: "1730407563874984"
                    }
                ]
            }
        }
    }
}
