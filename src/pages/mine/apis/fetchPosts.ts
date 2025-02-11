import axios from "axios";
import { useAuthStore } from "../../../store/authStore";

interface Post {
	postId: number;
	url: string;
}

export const fetchPosts = async (
	endpoint: string,
	buttonText: string,
	setImageList: (images: string[]) => void,
	setMessage: (message: string) => void
): Promise<void> => {
	try {
		const accessToken = useAuthStore.getState().accessToken; // useAuthStore 내부 값 가져오기

		const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.data.success) {
			let posts: Post[] = [];

			// '/myPage/posts'의 경우 응답 구조가 다름
			if (endpoint === "/myPage/posts") {
				const data = response.data.success.data; // API 문서 참고
				if (Array.isArray(data) && data.length > 0) {
					posts = data.map((post) => ({
						postId: post.postId,
						url: post.picture, // 'picture' 필드를 URL로 사용
					}));
				}
			} else {
				// 다른 엔드포인트는 동일한 방식 처리
				posts = response.data.success.post;
			}

			if (posts.length > 0) {
				setImageList(posts.map((post) => post.url));
				setMessage("");
				console.log("성공!");
			} else {
				console.log("성공!");
				setImageList([]);
				setMessage(`${buttonText}이 아직 없어요.`);
			}
		} else {
			console.log("실패ㅠㅠ:", response.data);
		}
	} catch (error) {
		console.error("Error fetching posts:", error);
		setImageList([]);
		setMessage("데이터를 불러오는 중 오류가 발생했습니다.");
	}
};
