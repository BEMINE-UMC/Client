import { create } from "zustand";


// 상태 정의
interface LikeState {
  likedTemplates: { [key: number]: boolean }; // 템플릿의 좋아요 상태
  likeCounts: { [key: number]: number }; // 템플릿의 좋아요 카운트
  toggleLike: (templateId: number) => void; // 좋아요 상태 전환 함수
  setLikeCount: (templateId: number, count: number) => void; // 좋아요 카운트 업데이트 함수
}

const useLikesStore = create<LikeState>((set) => ({
  likedTemplates: {}, // 좋아요 상태 초기화
  likeCounts: {}, // 좋아요 카운트 초기화
  toggleLike: (templateId) => {
    set((state) => {
      const isLiked = state.likedTemplates[templateId] || false;
      const updatedLikedTemplates = { ...state.likedTemplates, [templateId]: !isLiked };
      return { likedTemplates: updatedLikedTemplates };
    });
  },
  setLikeCount: (templateId, count) => {
    set((state) => ({
      likeCounts: { ...state.likeCounts, [templateId]: count },
    }));
  },
}));

export { useLikesStore };