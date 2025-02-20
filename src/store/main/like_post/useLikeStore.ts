import { create } from "zustand";

interface LikeState {
  likeStatus: Record<number, boolean>; // ✅ likeStatus 속성 추가
  toggleLike: (postId: number, status: boolean) => void;
  
}

export const useLikeStore = create<LikeState>((set) => ({
  likeStatus: {}, // ✅ 상태명 수정

  toggleLike: (postId) =>
    set((state) => ({
      likeStatus: {
        ...state.likeStatus,
        [postId]: !state.likeStatus[postId], // ✅ 현재 상태를 반전시킴
      },
    })),
}));