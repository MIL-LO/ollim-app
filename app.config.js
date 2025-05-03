// app.config.js
const path = require('path');
const fs = require('fs');

// 환경 변수 로드 시도
const loadEnvVars = () => {
  try {
    // .env 파일이 존재하는지 확인
    const envPath = path.resolve('.env');
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8');
      const envVars = {};

      // 간단한 .env 파일 파싱
      envFile.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length === 2) {
          const key = parts[0].trim();
          const value = parts[1].trim();
          envVars[key] = value;
        }
      });

      return envVars;
    }
  } catch (error) {
    console.error('Error loading .env file:', error);
  }

  return {};
};

// 환경 변수 가져오기
const envVars = loadEnvVars();

// 브랜치 정보 가져오기
const getBranch = () => {
  // 환경 변수, 파일, 또는 기본값에서 브랜치 가져오기
  return process.env.BRANCH || envVars.BRANCH || 'dev';
};

// 도메인 정보 구성
const getDomainInfo = () => {
  const branch = getBranch();

  // 기본 도메인
  const domainBase = process.env.DOMAIN_BASE || envVars.DOMAIN_BASE || '';

  // 브랜치별 서브도메인 설정
  let domainPrefix;
  if (process.env.DOMAIN_PREFIX || envVars.DOMAIN_PREFIX) {
    // 환경 변수에서 도메인 프리픽스 가져오기
    domainPrefix = process.env.DOMAIN_PREFIX || envVars.DOMAIN_PREFIX;
  } else {
    // 브랜치 기반 기본값
    domainPrefix = branch === 'main' ? 'app' : 'dev';
  }

  return { domainBase, domainPrefix };
};

// app.config.js
module.exports = {
  name: "OllimApp",
  slug: "ollim",  // ollim-app에서 ollim으로 변경
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
  owner: "9bfish8"  // owner 정보 추가
};