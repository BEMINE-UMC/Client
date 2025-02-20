import { useMutation } from "@tanstack/react-query";

import { useLikeStore } from "../../store/main/like_post/useLikeStore"
import api from "../../api/axios";


interface LikeResponse {
  resultType: string;
  success: {
    id: number;
    userId: number;
    postId: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export const useLikeMutation = () => {
  const { toggleLike } = useLikeStore();

  return useMutation({
    mutationFn: async (postId: number) => {
      const response = await api.put<LikeResponse>(
        `/posts/${postId}/likes`
      );
      return response.data;
    },

    onSuccess: (data) => {
      const { postId, status } = data.success;
      toggleLike(postId, status);
    },

    onError: (error) => {
      console.error("좋아요 API 호출 실패:", error);
    },
  });
};