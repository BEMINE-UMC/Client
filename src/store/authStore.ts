import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setLoggedIn: (accessToken: string, refreshToken: string) => void;
  setLoggedOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('accessToken'),
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  
  setLoggedIn: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ 
      isLoggedIn: true, 
      accessToken, 
      refreshToken 
    });
  },
  
  setLoggedOut: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ 
      isLoggedIn: false, 
      accessToken: null, 
      refreshToken: null 
    });
  }
})); 