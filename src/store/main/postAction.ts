import { create } from "zustand";
import api from "../../api/axios";
import { refreshTokens } from "../../api/refresh";
import { useAuthStore } from "../authStore";
import { usePostStore } from "./postStore";

interface PostActions {
    likePost: (postId: number) => Promise<void>;
    scrapPost: (postId: number) => Promise<void>;
}

export const usePostActions = create<PostActions>(() => ({
    likePost: async (postId: number) => {
      const { posts, updateLikeStatus } = usePostStore.getState();
      const token = useAuthStore.getState().accessToken;
  
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
  
      try {
        const response = await api.put(
          `/posts/${postId}/likes`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.data.resultType === "SUCCESS") {
          usePostStore.setState({
            posts: posts.map((post) =>
              post.postId === postId
                ? { ...post, likedStatus: !post.likedStatus, likesCount: post.likedStatus ? post.likesCount - 1 : post.likesCount + 1 }
                : post
            ),
          });
        } else if (response.data.error?.errorCode === "TOKEN_EXPIRED") {
          await refreshTokens();
          await usePostActions.getState().likePost(postId);
        } else {
          console.error("❌ 좋아요 실패:", response.data.error);
        }
      } catch (error) {
        console.error("❌ 좋아요 API 오류:", error);
      }
    },
  
    scrapPost: async (postId: number) => {
      const { posts } = usePostStore.getState();
      const token = useAuthStore.getState().accessToken;
  
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
  
      try {
        const response = await api.put(
          `/posts/${postId}/scrapts`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.data.resultType === "SUCCESS") {
          usePostStore.setState({
            posts: posts.map((post) =>
              post.postId === postId ? { ...post, scrapStatus: !post.scrapStatus } : post
            ),
          });
        } else if (response.data.error?.errorCode === "TOKEN_EXPIRED") {
          await refreshTokens();
          await usePostActions.getState().scrapPost(postId);
        } else {
          alert("스크랩 실패");
          console.error("❌ 스크랩 실패:", response.data.error);
        }
      } catch (error) {
        console.error("❌ 스크랩 API 오류:", error);
      }
    },
  }));