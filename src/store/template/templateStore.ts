import { create } from "zustand";
import instance from "../../api/axios";
import { useAuthStore } from "../authStore";

export interface Template {
  templateCreatedAt: string;
  templateId: number;
  title: string;
  thumbnail: string;
  authorId: number;
  authorName: string;
  categoryId: number;
  categoryName: string;
  likedStatus?: boolean;  // 로그인 후에만 사용
  likesCount: number; // 아직 백엔드에 반영이 안됨(예상)
}

interface TemplateStore {
  templates: Template[];
  loading: boolean;
  error: string | null;
  fetchTemplates: (categoryId?: number, offset?: number, limit?: number) => Promise<void>;
  likeTemplate: (templateId: number) => Promise<void>;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  loading: false,
  error: null,

  fetchTemplates: async (categoryId = 1, offset = 0, limit = 20) => {
    set({ loading: true, error: null });

    const isLoggedIn = useAuthStore.getState().isLoggedIn;
    const endpoint = isLoggedIn ? "/user/templates" : "templates";

    console.log(`로그인 상태: ${isLoggedIn ? "로그인 됨" : "비로그인"}`);

    try {
      console.log(`📡 Fetching templates from ${endpoint}`);
      const response = await instance.get(endpoint, {
        params: { categoryId, offset, limit },
      });

      console.log("✅ 전체 템플릿 응답:", response.data);

      // 수정된 부분: API 응답 형식이 예상과 다른 경우에 대비한 추가 조건 처리
      if (response.data.resultType === "SUCCESS") {
        const successData = response.data.success;

        let templates: Template[] = [];

        // success가 배열인지 객체인지 체크
        if (Array.isArray(successData)) {
          templates = successData.map((template: any) => ({
            templateCreatedAt: template.templateCreatedAt,
            templateId: template.templateId,
            title: template.title,
            thumbnail: template.thumbnail,
            authorId: template.authorId,
            authorName: template.authorName,
            categoryId: template.categoryId,
            categoryName: template.categoryName,
            likedStatus: isLoggedIn ? template.likedStatus : undefined,
            likesCount: template.likesCount || 0,
          }));
        } else if (Array.isArray(successData?.data)) {
          templates = successData.data.map((template: any) => ({
            templateCreatedAt: template.templateCreatedAt,
            templateId: template.templateId,
            title: template.title,
            thumbnail: template.thumbnail,
            authorId: template.authorId,
            authorName: template.authorName,
            categoryId: template.categoryId,
            categoryName: template.categoryName,
            likedStatus: template.likedStatus,
            likesCount: template.likesCount || 0,
          }));
        } else {
          throw new Error("API 응답 형식이 예상과 다릅니다.");
        }
        console.log("✅ Zustand 상태 업데이트, 받은 템플릿 데이터:", templates);
        set({ templates, loading: false });
      } else {
        console.error("❌ 템플릿 조회 실패:", response.data.error);
        set({ error: response.data.error, loading: false });
      }
    } catch (error) {
      console.error("❌ API 호출 오류:", error);
      set({ error: "API 요청 실패", loading: false });
    }
  },

  likeTemplate: async (templateId: number) => {
    const { templates } = useTemplateStore.getState();
    const token = useAuthStore.getState().accessToken;

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await instance.put(`/templates/${templateId}/likes` , {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📡 템플릿 좋아요 API 응답:", response.data); // 좋아요 api 응답답

      if (response.data.resultType === "SUCCESS") {
        console.log(`✅ 템플릿 ID ${templateId} 좋아요 성공!`);
        set({
          templates: templates.map((template) =>
            template.templateId === templateId
              ? { ...template, likedStatus: !template.likedStatus, likesCount: template.likedStatus ? template.likesCount - 1 : template.likesCount + 1 }
              : template
          ),
        });
      } else {
        console.error("❌ 좋아요 실패:", response.data.error);
      }
    } catch (error) {
      console.error("❌ 좋아요 API 오류:", error);
    }
  },
}));