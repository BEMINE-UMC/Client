import axios from 'axios';
import { refreshTokens } from './refresh';
import { useAuthStore } from '../store/authStore';

// 토큰이 필요없는 public API 엔드포인트 목록
const PUBLIC_ENDPOINTS = [
  '/users/login',
  '/users/signup',
  '/users/sendEmail',
  '/users/checkEmail',
  '/users/search/data',
  '/users/search/password',
  '/users/refresh',
  '/users/search/nickname'
];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    // public 엔드포인트인 경우 토큰을 추가하지 않음
    if (PUBLIC_ENDPOINTS.some(endpoint => config.url?.includes(endpoint))) {
      return config;
    }

    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청일 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 재발급
        const newAccessToken = await refreshTokens();
        
        // 새 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 상태로 변경
        useAuthStore.getState().setLoggedOut();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 