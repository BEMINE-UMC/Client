import axios from "axios";
import { useAuthStore } from "../../../store/authStore";
import defaultImg from '../../../assets/images/mine/emptyThumbnail.svg';

interface Post {
	postId: number;
	url: string;
	myId: number;
}

interface PostWithId {
	id: number;
	url: string;
	userId: number;
	myId: number;
	postId: number;
}

export const fetchPosts = async (
	endpoint: string,
	buttonText: string,
	setImageList: (images: PostWithId[]) => void,
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

		console.log(accessToken);
		console.log("워크스페이스 요청 URL:", `${endpoint}`);
		console.log(" 워크스페이스 응답 데이터:", response.data);

		// body에서 이미지 URL 추출 함수
		const extractImageUrl = (body: string): string | null => {
			const match = body.match(/<img src='(.*?)'/); // 첫 번째 이미지 추출
			return match ? match[1] : null;
		};

		if (response.data.success) {
			let posts: PostWithId[] = [];
			console.log('success고, 현재 endloint는:', endpoint);

			// '/myPage/posts'의 경우 응답 구조가 다름
			if (endpoint === "/myPage/posts") {
				const data = response.data.success; // API 문서 참고

				console.log('내가 쓴 포스트 API 응답은:', data);
				if (Array.isArray(data) && data.length > 0) {
					console.log('내가 쓴 포스트 API 응답:', response);
					posts = data.map((post) => ({
						id: post.postId,
						url: post.thumbnail,
						userId: post.userId,
						myId: 1, // 임시 할당 
						postId: response.data.success.postId
					}));
					console.log('내가 쓴 포스트에서 posts는:', posts);
				}
			} else {
				console.log('내가 안썼을 때 API 응답은:', response);
				const myId = response.data.success.userId;
				console.log('내 myId는', myId);

				// 다른 엔드포인트는 동일한 방식 처리
				posts = response.data.success.post.map((post) => ({
					id: post.postId,
					// url: extractImageUrl(post.body) ?? defaultImg,
					url: post.url,
					userId: post.userId,
					myId: response.data.success.userId,
					postId: response.data.success.post.postId
				}));
				console.log('내가 쓴 포스트가 아닌 다른 포스트에서 posts는:', posts);
			}

			if (posts.length > 0) {
				setImageList(posts);

				// 디버깅 코드임
				const imageUrls = posts.map((post) => post.url);
				console.log('imageList에 담긴 애들은', imageUrls);

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
