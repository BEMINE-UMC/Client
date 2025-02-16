import { create } from "zustand";
import instance from "../../api/axios";

// Template 데이터 타입 정의
export interface PopularTemplate {
    likesCount: any;
    id: number;   // API 응답에 맞게 `templateId` -> `id`로 변경
    title: string;
    image: string;  // `thumbnail`을 `image`로 저장
}

// Zustand 스토어 타입 정의
interface PopularTemplateStore {
    templates: PopularTemplate[];
    loading: boolean;
    error: string | null;
    fetchPopularTemplates: () => Promise<void>;
}

export const usePopularTemplateStore = create<PopularTemplateStore>((set) => ({
    templates: [],
    loading: false,
    error: null,
    
    // 템플릿 목록을 가져오는 함수
    fetchPopularTemplates: async () => {
        set({ loading: true, error: null }); // 로딩 상태 시작
        
        try {
            const response = await instance.get("/templates/popular");
            
            const templates = response.data.success.map((template: any) => ({
                id: template.id,  // API에서 제공하는 `id`
                title: template.title,
                image: template.thumbnail,  // `thumbnail`을 `image`로 사용
            }));

            console.log("✅ 배너 응답:", response.data);

            set({ templates, loading: false }); // 데이터 성공적으로 로드 후 상태 업데이트
        } catch (error) {
            set({ loading: false, error: "템플릿 데이터를 가져오지 못했습니다." });
            console.error("API 요청 실패: 템플릿 데이터를 가져오지 못했습니다.", error);
        }
    },
}));