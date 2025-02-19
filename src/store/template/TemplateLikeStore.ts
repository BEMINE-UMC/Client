import { create } from "zustand";


interface TemplateLikeStore {
    likedTemplates: Record<number, boolean>; // templateId: likedStatus 매핑
    toggleLike: (templateId: number) => void;
}

export const useTemplateLikeStore = create<TemplateLikeStore>((set) => ({
    likedTemplates: {},
    
    toggleLike: (templateId) =>
      set((state) => {
        const newLikedStatus = !state.likedTemplates[templateId];
        return {
          likedTemplates: {
            ...state.likedTemplates,
            [templateId]: newLikedStatus,
          },
        };
      }),
  }));

