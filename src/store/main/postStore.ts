import { create } from "zustand";
import instance from "../../api/axios";

interface Post {
  postCreatedAt: string;
  postId: number;
  title: string;
  thumbnail: string;
  authorId: number;
  authorName: string;
  categoryId: number;
  categoryName: string;
  likedStatus?: boolean;
  scrapStatus?: boolean;
  likesCount: number;
}

interface PostStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: (categoryId?: number, offset?: number, limit?: number) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async (categoryId = 1, offset = 0, limit = 20) => {
    set({ loading: true, error: null }); // 로딩 시작

    try {
      console.log("📡 Fetching posts from API...");
      const response = await instance.get("/posts", {
        params: { categoryId, offset, limit },
      });

    console.log("✅ 전체 API 응답:", response.data); // 전체 응답 구조 확인
    console.log("✅ success 데이터:", response.data.success);
    console.log("✅ success.data:", response.data.success?.data);

      if (response.data.resultType === "SUCCESS") {
        set({ posts: response.data.success?.data || [], loading: false });
      } else {
        console.error("❌ 게시물 조회 실패:", response.data.error);
        set({ error: response.data.error, loading: false });
      }
    } catch (error) {
      console.error("❌ API 호출 오류:", error);
      set({ error: "API 요청 실패", loading: false });
    }
  },
}));