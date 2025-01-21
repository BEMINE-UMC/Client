import axios from 'axios';

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
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await axios.post<RefreshResponse>(
      'http://3.37.241.32:3000/users/refresh',
      { refreshToken }
    );

    if (response.data.resultType === "SUCCESS" && response.data.success) {
      // 새로운 access token만 저장
      localStorage.setItem('accessToken', response.data.success.accessToken);
      return response.data.success.accessToken;
    } else {
      throw new Error(response.data.error?.reason || 'Token refresh failed');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.reason || 'Token refresh failed';
      console.error('Token refresh error:', errorMessage);
    }
    // 토큰 갱신 실패 시 로그아웃 처리
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw error;
  }
}; 