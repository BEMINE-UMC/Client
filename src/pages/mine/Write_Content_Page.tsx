import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";

import CustomColumn from "./components/CustomColumn";
import CustomRow from "./components/CustomRow";
import StyledImg from "./components/StyledImg";
import CustomDivider from "./components/CustomDivider";
import CustomButton from "./components/CustomButton";
import CustomFont from "./components/CustomFont";
import CustomInput from "./components/CustomInput";
import Modal from "./components/Modal";
import profile from "../../assets/images/mockData/mockData_mine_ProfileImg.png";
import TextEditor from "./components/TextEditor";
import defaultImg from '../../assets/images/mine/default_img.png';
import CustomBox from "./components/CustomBox";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const categories = [
	"콘텐츠 마케터",
	"브랜드 마케터",
	"퍼포먼스 마케터",
	"바이럴 마케터",
];

const WriteContentPage = () => {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState(categories[0]);
	const [editorContent, setEditorContent] = useState("");
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const [writeModal, setWriteModal] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const id = location.state?.id;
	const accessToken = useAuthStore((state) => state.accessToken);
	const [isDelete, setIsDelete] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	useEffect(() => {
		if (id) {
			console.log("ID 전달받음, 수정하겠다는 뜻 !!:", id);
			setIsDelete(true);
			fetchPostById(id); // ID가 있으면 API 호출
		} else {
			console.log("ID가 전달되지 않음, 새 게시물 작성한다는 뜻!");
		}
	}, [id, accessToken]);

	// 프로필 데이터 전체 상태로 관리
	const [profileData, setProfileData] = useState<{ name: string; introduction: string; photo: string; history: { id: number; title: string; body: string }[] }>({
		name: "",
		introduction: "",
		photo: "",
		history: []
	});
	const [history, setHistory] = useState<{ id: number; title: string; body: string }[]>([]);
	const [loading, setLoading] = useState(true);

	// 마이페이지 정보 조회 API 요청 함수
	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/myPage`, {
					headers: {
						"Accept": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (response.status === 200 && response.data.success) {
					setProfileData({
						...response.data.success,
						photo: response.data.success.photo || defaultImg
					});
					setHistory(response.data.success.history || []);
				}
			} catch (error) {
				console.error("게시물 페이지에서 마이페이지&연혁 정보 조회 실패:", error);
				console.log(accessToken);
			} finally {
				setLoading(false);
			}
		};
		fetchProfileData();
	}, [accessToken]);

	const fetchPostById = async (id: number) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
				headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.status === 200 && response.data.success) {
				const { title, body } = response.data.success;

				setTitle(title);          // 제목을 CustomInput에 설정
				setEditorContent(body);  // 본문을 TextEditor에 설정
			}
		} catch (error) {
			console.error(`게시물 ID ${id}의 데이터를 불러오는 중 오류 발생:`, error);
		}
	};

	// 게시물 삭제 API
	const contentDelete = async (id: number) => {
		try {
			const response = await axios.patch(
				`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`,
				{}, // PATCH 요청에 Body가 필요하지 않으므로 빈 객체 전달
				{
					headers: {
						"Accept": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200 && response.data.success) {
				console.log('삭제 성공 !!');
				setDeleteModal(false);
				alert('성공적으로 삭제되었습니다.');
				navigate('/my');
			}
		} catch (error) {
			console.error(`게시물 ID ${id}를 삭제하던 중 오류 발생:`, error);
			console.log(accessToken);
			alert('삭제에 실패했습니다.');
		}
	};


	const openDeleteModal = () => {
		setDeleteModal(true);
	}

	const handleSubmit = async () => {
		// <img /> 태그의 src 속성을 추출하는 함수
		const extractImageSrc = (body: string): string | null => {
			const match = body.match(/<img.*?src=["'](.*?)["']/);
			return match ? match[1] : null;
		};

		const thumbnail = extractImageSrc(editorContent); // 첫 번째 이미지의 src 추출

		const data = {
			title,
			body: editorContent,
			categoryId: categories.indexOf(category) + 1,
			thumbnail, // 추출한 이미지 URL을 thumbnail에 담음
		};

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/posts/write`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 201) {
				console.log('title은:', title);
				console.log('body에 담긴 내용은:', editorContent);
				console.log('썸네일 이미지 링크는:', thumbnail);
				alert("게시글이 성공적으로 작성되었습니다.");
				setWriteModal(false);
				navigate('/my');
			}
		} catch (error) {
			console.log('body에 담긴 내용은:', editorContent);
			console.log('썸네일 이미지 링크는:', thumbnail);
			// console.log(accessToken);
			console.error("Error submitting post:", error);
			alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const isContentEmpty = !editorContent.trim();
	const isTitleEmpty = title.trim() === "";
	const isButtonDisabled = isContentEmpty || isTitleEmpty;

	return (
		<CustomColumn
			$width="100vw"
			$minHeight="100vh"
			$alignitems="center"
			$justifycontent="flex-start"
			$padding="0.5rem"
			$gap="3rem"
		>
			<CustomColumn $height="2vh"></CustomColumn>
			<CustomRow
				$width="90%"
				$height="auto"
				$gap="4rem"
				$alignitems="flex-start"
				$justifycontent="flex-start"
			>
				<StyledImg src={profileData.photo || "default-profile.png"} style={{ maxWidth: '20%' }} $borderradius="0.5rem" />

				<CustomColumn
					$width="25%"
					$height="auto"
					$gap="3rem"
					$alignitems="flex-start"
					$justifycontent="center"
				>
					<CustomInput
						placeholder="제목을 입력하세요"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<CustomColumn
						$width="100%"
						$height="auto"
						$gap="1rem"
						$alignitems="flex-start"
						$justifycontent="center"
					>
						<CustomFont $color="black">{new Date().toLocaleDateString()}</CustomFont>
						<CustomDivider $width="100%" $height="1px" $backgroundcolor="#C9C9C9" />
						<CustomFont $color="black" $font="1rem">{profileData.name}</CustomFont>
					</CustomColumn>
				</CustomColumn>

				<CustomColumn
					$width="70%"
					$height="auto"
					$gap="1rem"
					$alignitems="flex-start"
					$justifycontent="center"
				>
					{loading ? (
						<CustomFont $color="gray">불러오는 중...</CustomFont>
					) : history.length > 0 ? (
						history.map((entry) => (
							<CustomColumn key={entry.id} $width="100%" $alignitems="flex-start" $gap='0.5rem'>
								<CustomFont $color="#686868" $font="0.8rem" $fontweight="bold">{entry.title}</CustomFont>
								<CustomFont $color="#686868" $font="0.8rem">{entry.body}</CustomFont>
							</CustomColumn>
						))
					) : (
						<CustomColumn $width="100%" $alignitems="center">
							<CustomFont $color="gray">아직 연혁이 없어요!</CustomFont>
						</CustomColumn>
					)}
				</CustomColumn>

			</CustomRow>

			<CustomColumn
				$width="90%"
				$height="auto"
				$gap="1rem"
				$alignitems="flex-start"
				$justifycontent="flex-start"
			>
				<CustomFont $color="#666666" $fontweight="bold" $font="1rem">
					카테고리 선택
				</CustomFont>
				<CustomRow
					$width="100%"
					$alignitems="flex-start"
					$justifycontent="flex-start"
					$gap="0.5rem"
				>

					{categories.map((cat, index) => (
						<label key={index}>
							<input
								type="radio"
								name="category"
								value={cat}
								checked={category === cat}
								onChange={() => setCategory(cat)}
							/>
							<CustomFont $color="black" $fontweight="bold">{cat}</CustomFont>
						</label>
					))}
				</CustomRow>
			</CustomColumn>

			<TextEditor value={editorContent} onChange={setEditorContent} />

			<CustomRow $width="90%" $justifycontent="flex-end">

				{isDelete && (
					<CustomButton
						$width="5rem"
						$height="auto"
						$padding="0"
						$backgroundColor='transparent'
						onClick={openDeleteModal}
					>
						<CustomFont $color="#D9D9D9" $fontweight="bold" style={{ textDecoration: "unserline" }}>삭제</CustomFont>
					</CustomButton>
				)}

				<CustomButton
					$width="5rem"
					$height="auto"
					$padding="0.5rem"
					$backgroundColor={isButtonDisabled ? "#D9D9D9" : "#FFE100"}
					disabled={isButtonDisabled}
					onClick={() => setWriteModal(true)}
				>
					<CustomFont $color="black" $fontweight="bold">게시</CustomFont>
				</CustomButton>
			</CustomRow>

			<Modal isOpen={writeModal} onClose={() => setWriteModal(false)}>
				<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
					<CustomFont $color="black" $fontweight="bold">게시하시겠습니까?</CustomFont>
					<CustomRow $width="90%">
						<CustomButton $backgroundColor="transparent" onClick={() => setWriteModal(false)}>
							<CustomFont $color="black" $fontweight="bold">취소</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="#FFE100" onClick={handleSubmit}>
							<CustomFont $color="black" $fontweight="bold">게시하기</CustomFont>
						</CustomButton>
					</CustomRow>
				</CustomColumn>
			</Modal>

			<Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
				<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
					<CustomFont $color="black" $fontweight="bold">삭제하시겠습니까?</CustomFont>
					<CustomRow $width="90%">
						<CustomButton $backgroundColor="transparent" onClick={() => setDeleteModal(false)}>
							<CustomFont $color="black" $fontweight="bold">취소</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="#FFE100" onClick={() => contentDelete(id)}>
							<CustomFont $color="black" $fontweight="bold">삭제하기</CustomFont>
						</CustomButton>
					</CustomRow>
				</CustomColumn>
			</Modal>
		</CustomColumn>
	);
};

export default WriteContentPage;
