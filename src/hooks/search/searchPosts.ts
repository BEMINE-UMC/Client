import axios from "axios";

export const searchPosts = async (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();  // 🔍 공백 제거

    if (!trimmedSearchTerm) {
        console.warn("⚠️ 검색어가 비어 있습니다!");
        return [];
    }

    console.log("🌍 API 요청 시작! 검색어:", trimmedSearchTerm);

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/search`, {
            params: { searchWord: trimmedSearchTerm },
            headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200 && Array.isArray(response.data.success)) {
            const results = response.data.success; 
            console.log("📄 최종 검색 결과:", results);
            return results;
        } else {
            console.error("❌ 검색 실패:", response.data);
            return [];
        }
    } catch (error) {
        console.error("❌ 검색 오류:", error);
        return [];
    }
};