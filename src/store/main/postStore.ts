import { create } from "zustand";
import instance from "../../api/axios";
import { useAuthStore } from "../authStore";
import { refreshTokens } from "../../api/refresh";

interface Post {
  postCreatedAt: string;
  postId: number;
  title: string;
  thumbnail: string;
  authorId: number;
  authorName: string;
  categoryId: number;
  categoryName: string;
  likedStatus?: boolean;  // 로그인 후에만 사용
  scrapStatus?: boolean;  // 로그인 후에만 사용
  likesCount: number; // 아직 백엔드에 반영이 안됨(예상)
}

interface PostStore {
  posts: Post[];
  loading: boolean; 
  error: string | null;
  fetchPosts: (categoryId?: number, offset?: number, limit?: number) => Promise<void>;
  updateLikeStatus: (postId: number, liked: boolean, likesCount: number) => void; // ✅ 추가
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async (categoryId = undefined, offset = 0, limit = 100) => {
    set({ loading: true, error: null });

    const isLoggedIn = useAuthStore.getState().isLoggedIn;
    const endpoint = isLoggedIn ? "/user/posts" : "/posts";

    console.log(`🔍 로그인 상태: ${isLoggedIn ? "로그인됨 ✅" : "비로그인 ❌"}`);

    try {
      console.log(`📡 Fetching posts from ${endpoint}...`);
      const response = await instance.get(endpoint, {
        params: { categoryId, offset, limit },
      });

      console.log("✅ 전체 API 응답:", response.data);

      // 성공 응답 구조 검증
      if (response.data.resultType === "SUCCESS") {
        const successData = response.data.success;

        let posts: Post[] = [];

        // success가 배열인지 객체인지 체크
        if (Array.isArray(successData)) {
          posts = successData.map((post: any) => ({
            postCreatedAt: post.postCreatedAt,
            postId: post.postId,
            title: post.title,
            thumbnail: post.thumbnail,
            authorId: post.authorId,
            authorName: post.authorName,
            categoryId: post.categoryId,
            categoryName: post.categoryName,
            likedStatus: isLoggedIn ? post.likedStatus : undefined,
            scrapStatus: isLoggedIn ? post.scrapStatus : undefined,
            likesCount: post.likesCount ?? 0,
          }));
        } else if (Array.isArray(successData?.data)) {
          posts = successData.data.map((post: any) => ({
            postCreatedAt: post.postCreatedAt,
            postId: post.postId,
            title: post.title,
            thumbnail: post.thumbnail,
            authorId: post.authorId,
            authorName: post.authorName,
            categoryId: post.categoryId,
            categoryName: post.categoryName,
            likedStatus: isLoggedIn ? post.likedStatus : undefined,
            scrapStatus: isLoggedIn ? post.scrapStatus : undefined,
            likesCount: post.likesCount ?? 0,
          }));
        } else {
          throw new Error("API 응답 형식이 예상과 다릅니다.");
        }

        console.log("✅ Zustand 상태 업데이트, 받은 데이터:", posts);
        set({ posts, loading: false });
      } else {
        // 토큰 만료 체크
        if (response.data.error?.errorCode === 'TOKEN_EXPIRED') {
          console.log("❌ 토큰 만료됨, 재발급 시도...");
          await refreshTokens();  // 토큰 재발급 함수 호출
          await usePostStore.getState().fetchPosts(categoryId, offset, limit);  // 갱신된 토큰으로 다시 시도
        } else {
          console.error("❌ 게시물 조회 실패:", response.data.error);
          set({ error: response.data.error, loading: false });
        } 
      }
    } catch (error) {
      console.error("❌ API 호출 오류:", error);
      set({ error: "API 요청 실패", loading: false });
    }
  },

  updateLikeStatus: (postId, liked, likesCount) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.postId === postId ? { ...post, likedStatus: liked, likesCount } : post
      ),
    }));
  },
}));