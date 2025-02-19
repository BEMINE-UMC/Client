import { create } from "zustand";
import api from "../../api/axios";

interface OtherPost {
    userId: number;
    postId: number;
    title: string;
    picture: string;
}

interface OtherPostsState {
    posts: OtherPost[];
    loading: boolean;
    error: string | null;
    fetchOtherPosts: (postId: string) => Promise<void>;
}

export const useOtherPostsStore = create<OtherPostsState>((set) => ({
    posts: [],
    loading: false,
    error: null,
  
    fetchOtherPosts: async (postId) => {
      set({ loading: true, error: null });
      try {
        const response = await api.get<{ resultType: string; success: OtherPost[] }>(
          `/users/posts/${postId}/other`
        );
        
        if (response.data.resultType === 'SUCCESS') {
          set({ posts: response.data.success, loading: false });
        } else {
          set({ error: '데이터를 불러오지 못했습니다.', loading: false });
        }
      } catch (err) {
        set({ error: 'API 요청 실패', loading: false });
      }
    },
  }));