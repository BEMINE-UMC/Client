import { create } from "zustand";
import { useAuthStore } from "../authStore";
import instance from "../../api/axios";


interface PostDetail {
    title: string;
    body: any;
    createdAt: string;
    updatedAt: string;
    liked?: boolean; // 로그인한 경우에만 제공
}

interface PostDetailStore {
    postDetail: PostDetail | null;
    loading: boolean;
    error: string | null;
    fetchPostDetail: (postId: number) => Promise<void>; 
}

export const usePostDetailStore = create<PostDetailStore>((set) => ({
    postDetail: null,
    loading: false,
    error: null,
  
    fetchPostDetail: async (postId: number) => {
      set({ loading: true, error: null });
  
      const token = useAuthStore.getState().accessToken;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
      try {
        console.log(`📡 Fetching post detail for ID ${postId}...`);
        const response = await instance.get(`/posts/${postId}`, { headers });
  
        console.log("✅ 게시물 상세정보 API 응답:", response.data);
  
        if (response.data.resultType === "SUCCESS" && response.data.success) {
          set({
            postDetail: {
              title: response.data.success.title,
              body: response.data.success.body,
              createdAt: response.data.success.createdAt,
              updatedAt: response.data.success.updatedAt,
              liked: response.data.success.liked,
            },
            loading: false,
          });
        } else {
          console.error("❌ 게시글 조회 실패:", response.data.error);
          set({ error: response.data.error.reason, loading: false });
        }
      } catch (error) { //네트워크 오류 처리
        console.error("❌ API 호출 오류:", error);
        set({ error: "게시글 정보를 불러오는 중 오류가 발생했습니다.", loading: false });
      }
    },
  }));