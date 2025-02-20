import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios"; // Axios 인스턴스
import { useScrapStore } from "../../store/main/scrap_post/useScrapStore"; // store 임포트

interface ScrapResponse {
  resultType: string;
  success: {
    id: number;
    postId: number;
    userId: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  }; // 배열이 아닌 객체로 변경
}

const useScrapMutation = () => {
  const { setScrap } = useScrapStore(); // useScrapStore에서 상태 업데이트 함수 가져오기

  const { mutate } = useMutation({
    mutationFn: async (postId: number) => {
      const response = await api.put<ScrapResponse>(`/posts/${postId}/scrapts`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data; // 응답 데이터 반환
    },
    onSuccess: (data) => {
      if (data && data.success) {
        const { postId: returnedPostId, status } = data.success;
        console.log("스크랩 성공:", returnedPostId);

        // 스크랩 상태 업데이트
        setScrap({ postId: returnedPostId, status });

      } else {
        console.error("스크랩 실패: 데이터가 없습니다.", data);
      }
    },
    onError: (error) => {
      console.error("스크랩 API 호출 실패:", error);
    },
  });

  return { mutate };
};

export { useScrapMutation };