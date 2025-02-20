import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios"; // Axios 인스턴스
import { useLikesStore } from "../../store/template/useLikesStore";


interface LikeResponse {
  resultType: string;
  success: {
    id: number;
    templateId: number;
    userId: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const useLikeMutation = () => {
  const { setLikeCount, toggleLike } = useLikesStore();

  const { mutate } = useMutation({
    mutationFn: async (templateId: number) => {
      const response = await api.put<LikeResponse>(`/templates/${templateId}/likes`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data && data.success) {
        const { templateId, status } = data.success;
        toggleLike(templateId); // 상태 변경
        setLikeCount(templateId, status ? 1 : 0); // 좋아요 카운트 업데이트
      } else {
        console.error("템플릿 좋아요 실패: 데이터가 없습니다.", data);
      }
    },
    onError: (error) => {
      console.error("템플릿 좋아요 API 호출 실패:", error);
    },
  });

  return { mutate };
};

export { useLikeMutation };