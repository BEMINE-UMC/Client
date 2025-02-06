import { create } from "zustand";
import instance from "../../api/axios";

// Template 데이터 타입 정의
export interface PopularTemplate {
    likedStatus: boolean;
    likesCount: number;
    categoryName: string;
    templateId: number;
    image: string;
    title: string;
    file: string; // 추가된 속성
    templateCreatedAt?: string; // 추가된 속성
    thumbnail?: string; // 추가된 속성
    authorId?: number; // 추가된 속성
    categoryId: number;
    authorName: string;
}

// Zustand 스토어 타입 정의
interface PopularTemplateStore {
    likeTemplate: (templateId: number) => void;
    error: string | null;
    loading: boolean;
    templates: PopularTemplate[];
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
                templateId: template.templateId,
                title: template.title,
                image: template.thumbnail,  // API에서 받은 `thumbnail`을 `image`로 저장
                likedStatus: template.likedStatus || false,  // 기본 값 설정
                likesCount: template.likesCount || 0,  // 기본 값 설정
                categoryName: template.categoryName || "",  // 기본 값 설정
            }));

            set({ templates, loading: false }); // 데이터 성공적으로 로드 후 상태 업데이트
        } catch (error) {
            set({ loading: false, error: "템플릿 데이터를 가져오지 못했습니다." });
            console.error("API 요청 실패: 템플릿 데이터를 가져오지 못했습니다.", error);
        }
    },

    // 좋아요 상태를 토글하는 함수
    likeTemplate: (templateId: number) => {
        set((state) => {
            const updatedTemplates = state.templates.map((template) =>
                template.templateId === templateId
                    ? { ...template, likedStatus: !template.likedStatus }
                    : template
            );
            return { templates: updatedTemplates };
        });
    },
}));