import { create } from "zustand";

interface LikeStore {
  likedStatus: { [postId: number]: boolean };
  toggleLike: (postId: number) => void;
}

interface BookmarkStore {
  bookmarkedStatus: { [postId: number]: boolean };
  toggleBookmark: (postId: number) => void;
}

export const useLikeStore = create<LikeStore>((set) => ({
  likedStatus: {},
  toggleLike: (postId) =>
    set((state) => ({
      likedStatus: {
        ...state.likedStatus,
        [postId]: !state.likedStatus[postId],
      },
    })),
}));

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarkedStatus: {},
  toggleBookmark: (postId) =>
    set((state) => ({
      bookmarkedStatus: {
        ...state.bookmarkedStatus,
        [postId]: !state.bookmarkedStatus[postId],
      },
    })),
}));