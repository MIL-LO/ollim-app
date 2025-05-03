// app.config.js
module.exports = {
  name: "OllimApp",
  slug: "ollim",
  version: "1.0.0",
  orientation: "portrait",
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ollim.app",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false // 앱이 암호화를 사용하지 않음을 명시
    }
  },
  android: {
    package: "com.ollim.app",
    adaptiveIcon: {
      backgroundColor: "#ffffff"
    }
  },
  web: {},
  extra: {
    eas: {
      projectId: "25d65e0c-3de4-428a-a8ef-5c23ec7eb033"
    }
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/25d65e0c-3de4-428a-a8ef-5c23ec7eb033"
  },
  runtimeVersion: {
    policy: "sdkVersion"
  },
  owner: "9bfish8"
};