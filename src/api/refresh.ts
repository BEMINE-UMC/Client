import api from './axios';
import { useAuthStore } from '../store/authStore';

interface RefreshResponse {
  resultType: "SUCCESS" | "FAIL";
  error: {
    errorCode: string;
    reason: string;
    data: any;
  } | null;
  success: {
    accessToken: string;
  } | null;
}

export const refreshTokens = async () => {
  try {
    const refreshToken = useAuthStore.getState().refreshToken;
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await api.post<RefreshResponse>('/users/refresh', { refreshToken });

    if (response.data.resultType === "SUCCESS" && response.data.success) {
      // Zustand store 업데이트
      useAuthStore.getState().setLoggedIn(
        response.data.success.accessToken,
        refreshToken  // refresh token은 그대로 유지
      );
      return response.data.success.accessToken;
    } else {
      throw new Error(response.data.error?.reason || 'Token refresh failed');
    }
  } catch (error) {
    // 토큰 갱신 실패 시 로그아웃
    useAuthStore.getState().setLoggedOut();
    window.location.href = '/login';
    throw error;
  }
}; 