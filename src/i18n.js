// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 번역 파일 정의
const resources = {
  en: {
    translation: {
      welcome: "Welcome to our app!",
      description: "This is a multi-language application."
    }
  },
  ko: {
    translation: {
      welcome: "우리 앱에 오신 것을 환영합니다!",
      description: "이것은 다국어 애플리케이션입니다."
    }
  }
};

// i18n 초기화
i18n.use(initReactI18next).init({
  resources,
  lng: "ko", // 기본 언어 설정
  fallbackLng: "ko", // 언어를 찾지 못할 때 사용할 언어
  interpolation: {
    escapeValue: false // React는 XSS 방지 처리를 자체적으로 하기 때문에 false로 설정
  }
});

export default i18n;
