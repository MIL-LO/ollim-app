import Constants from 'expo-constants';

interface AppConfig {
  webUrl: string;
}

// URL을 직접 노출하지 않고 안전하게 관리
const getWebUrl = (): string => {
  // Constants에서 URL과 브랜치 정보 가져오기
  const configUrl = Constants.expoConfig?.extra?.webUrl;
  const branch = Constants.expoConfig?.extra?.branch;

  // Constants에 URL이 있으면 사용
  if (configUrl) {
    return configUrl as string;
  }

  // URL 구성 (직접 URL을 노출하지 않음)
  const domainBase = 'millo-ollim.com';
  const protocol = 'https://';

  // 브랜치별 서브도메인 설정
  if (branch === 'main') {
    return `${protocol}app.${domainBase}/`;
  } else {
    return `${protocol}dev.${domainBase}/`;
  }
};

const config: AppConfig = {
  webUrl: getWebUrl(),
};

export default config;