// app.config.js
// 실행 시 환경 변수에서 브랜치 정보 가져오기
const getBranch = () => {
  // 환경 변수에서 브랜치 정보 확인
  return process.env.BRANCH || 'dev';
};

module.exports = {
  name: "OllimApp",
  slug: "ollim-app",
  version: "1.0.0",
  orientation: "portrait",
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ollim.app"
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#ffffff"
    },
    package: "com.ollim.app"
  },
  web: {},
  extra: {
    // URL은 노출하지 않고 브랜치 정보만 전달
    branch: getBranch(),
    // 추가 설정이 필요한 경우
    eas: {
      projectId: "your-project-id"
    }
  }
};