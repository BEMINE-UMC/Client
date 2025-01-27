    import { create } from "zustand";
    import instance from "../../api/axios";

    // Template 데이터 타입 정의
    export interface Template {
        id: string;
        image: string;
        title: string;
        author: string;
        likesCount: number;
    }
    
    // Zustand 스토어 타입 정의
    interface TemplateStore {
        templates: Template[];
        fetchTemplates: () => Promise<void>;
    }
    
    export const useTemplateStore = create<TemplateStore>((set) => ({
        templates: [],
        fetchTemplates: async () => {
        try {
            const response = await instance.get("/templates/popular");
            const templates = response.data.success || [];
            
            if (templates.length > 0) {
            console.log("API 요청 성공: 템플릿 데이터가 정상적으로 로드되었습니다.");
            console.log("로드된 템플릿 데이터:", templates);
            } else {
            console.log("API 요청 성공: 데이터는 비어 있습니다.");
            }
            
            set({ templates });
        } catch (error) {
            console.error("API 요청 실패: 템플릿 데이터를 가져오지 못했습니다.", error);
        }
        },
    }));