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
    fetchOtherPosts: (postId: number) => Promise<void>;
}

export const useOtherPostsStore = create<OtherPostsState>((set) => ({
    posts: [],
    loading: false,
    error: null,
  
    fetchOtherPosts: async (postId) => {

      if (postId <= 0) {
        console.error("❌ 잘못된 postId 요청:", postId);
        set({ error: "잘못된 postId입니다.", loading: false });
        return;
      }

      set({ loading: true, error: null });
      console.log(`📡 사용자가 작성한 다른 게시물 조회하기.. /users/posts/${postId}/other`);

      try {
        const response = await api.get<{ resultType: string; success: OtherPost[] }>(
          `/users/posts/${postId}/other`
          
        );

        console.log("사용자가 작성한 다른 게시물:", response.data);
        
        if (response.data.resultType === 'SUCCESS') {
          console.log("🎉 사용자가 작성한 다른 게시물:", response.data.success);
          set({ posts: response.data.success, loading: false });
        } else {
          set({ error: '데이터를 불러오지 못했습니다.', loading: false });
        }
      } catch (err) {
        set({ error: 'API 요청 실패', loading: false });
      }
    },
  }));