import { create } from "zustand";

interface LikeState {
  likedPosts: { [key: number]: boolean };
  toggleLike: (postId: number) => void;
}

export const useLikeStore = create<LikeState>((set) => ({
  likedPosts: {},
  toggleLike: (postId) =>
    set((state) => ({
      likedPosts: {
        ...state.likedPosts,
        [postId]: !state.likedPosts[postId],
      },
    })),
}));