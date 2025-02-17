import axios from "axios";

export const searchPosts = async (searchTerm: string) => {

    console.log("🌍 API 요청 시작! 검색어:", searchTerm); // [디버깅] API 요청 전 확인

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/search`, {
            params: {
                // query: searchTerm,
                searchWord: searchTerm
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200 && response.data.success) {
            const results = response.data.success.data || [];  // 만약 null이면 빈 배열 반환
            console.log("📄 최종 검색 결과:", results);
            return results;
        } else {
            console.error("실패ㅠㅠ:", response.data);
            return [];
        }
    } catch (error) {
        console.error("검색 오류 !!:", error);
        return [];
    }
};