import { create } from "zustand";

// 상태 정의
interface ScrapState {
  scrapList: { postId: number; status: boolean }[]; // 상태 예시
  setScrap: (scrap: { postId: number; status: boolean }) => void; // setScrap 함수 정의
}

// useScrapStore 정의
const useScrapStore = create<ScrapState>((set) => ({
  scrapList: [],
  setScrap: (scrap) =>
    set((state) => ({
      scrapList: [...state.scrapList, scrap], // 상태 업데이트 로직
    })),
}));

export { useScrapStore };