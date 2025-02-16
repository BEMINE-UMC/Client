// "templateId": 1,
// "filePDF": "https://example.com/files/template1.pdf",
// "fileShareState": "저장 가능",
// "fileLikeStatus": true

import { create } from "zustand";
import { useAuthStore } from "../authStore";
import instance from "../../api/axios";

interface TemplateDetail {
    templateId: number;
    filePDF: string;
    fileShareState: string;
    fileLikeStatus: boolean;
}

interface TemplateDetailStore {
    templateDetail: TemplateDetail | null;
    loading: boolean;
    error: string | null;
    fetchTemplateDetail: (templateId: number) => Promise<void>;
}

export const useTemplateDetailStore = create<TemplateDetailStore>((set) => ({
    templateDetail: null,
    loading: false,
    error: null,

    fetchTemplateDetail: async (templateId: number) => {
        set({ loading: true, error: null });

        const token = useAuthStore.getState().accessToken;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        try {
            console.log(`📡 Fetching template detail for ID ${templateId}...`);
            const response = await instance.get(`/templates/${templateId}/view`, { headers });

            console.log("템플릿 상세정보 응답:", response.data);

            if(response.data.resultType === "SUCCESS" && response.data.success) {
                set({
                    templateDetail: {
                        templateId: response.data.success.templateId,
                        filePDF: response.data.success.filePDF,
                        fileShareState: response.data.success.fileShareState,
                        fileLikeStatus: response.data.success.fileLikeStatus,
                    },
                    loading: false,
                });
            } else {
                console.error("❌ 템플릿 상세 조회 실패:", response.data.error);
                set({ error: response.data.error.reason, loading: false });
            }
        } catch (error) { //네트워크 오류 처리
            console.error("❌ API 호출 오류:", error);
            set({ error: "템플릿 정보를 불러오는 중 오류가 발생했습니다.", loading: false });
        }
    },
}));