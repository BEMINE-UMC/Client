import { create } from "zustand";

// 상태의 타입을 정의
interface SearchState {
    searchTerm: string;
    results: any[]; // 결과의 타입은 실제 데이터에 맞게 수정
    setSearchTerm: (term: string) => void;
    setResults: (data: any[]) => void;
  }
  
  // zustand 상태 생성 시 타입 지정
  const useSearchStore = create<SearchState>((set) => ({
    searchTerm: '',
    results: [],
    setSearchTerm: (term) => set({ searchTerm: term }),
    setResults: (data) => set({ results: data }),
  }));

export default useSearchStore;