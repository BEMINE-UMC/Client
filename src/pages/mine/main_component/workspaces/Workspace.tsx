import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuthStore } from "../../../../store/authStore";
import axios from "axios";
import CustomColumn from "../../components/CustomColumn";
import CustomFont from "../../components/CustomFont";
import CustomButton from "../../components/CustomButton";
import WorkSpaceModals from "./WorkSpaceModals";
import { DropdownWrapper, DropdownMenu, GridContainer, ImageItem } from './WorkSpaceStyles';
import { FaChevronDown } from 'react-icons/fa';
import { fetchPosts } from "../../apis/fetchPosts";
import pdfMock from '../../../../assets/images/mine/mine_PDF_mockData.pdf';
import emptySpace from '../../../../assets/images/mine/icon_if_workspace_is_empty.svg';
import emptyThumbmail from '../../../../assets/images/mine/emptyThumbnail.svg';

import rank_before_1 from '../../../../assets/images/mine/rank_img/mine_rank_before_1.svg';
import rank_before_2 from '../../../../assets/images/mine/rank_img/mine_rank_before_2.svg';
import rank_before_3 from '../../../../assets/images/mine/rank_img/mine_rank_before_3.svg';
import rank_before_4 from '../../../../assets/images/mine/rank_img/mine_rank_before_4.svg';
import rank_before_5 from '../../../../assets/images/mine/rank_img/mine_rank_before_5.svg';
import rank_before_6 from '../../../../assets/images/mine/rank_img/mine_rank_before_6.svg';

import rank_after_1 from '../../../../assets/images/mine/rank_img/mine_rank_after_1.svg';
import rank_after_2 from '../../../../assets/images/mine/rank_img/mine_rank_after_2.svg';
import rank_after_3 from '../../../../assets/images/mine/rank_img/mine_rank_after_3.svg';
import rank_after_4 from '../../../../assets/images/mine/rank_img/mine_rank_after_4.svg';
import rank_after_5 from '../../../../assets/images/mine/rank_img/mine_rank_after_5.svg';
import rank_after_6 from '../../../../assets/images/mine/rank_img/mine_rank_after_6.svg';
import CustomDivider from "../../components/CustomDivider";
import CustomRow from "../../components/CustomRow";
import StyledImg from "../../components/StyledImg";
import Modal from "../../components/Modal";
import './postImg.css';

const rankBeforeImages = [
	rank_before_1,
	rank_before_2,
	rank_before_3,
	rank_before_4,
	rank_before_5,
	rank_before_6,
];

const rankAfterImages = [
	rank_after_1,
	rank_after_2,
	rank_after_3,
	rank_after_4,
	rank_after_5,
	rank_after_6,
];

// TODO: fetchPost가 준 myId, userId 받은 후 비교하여, 일치하면 내가 쓴 게시물이므로 수정화명으로 이동하고, 다르면 아니므로 (일단은) alert 처리하기 

const Workspace = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const [isHeartClicked, setIsHeartClicked] = useState(false);
	const [isHeartModal, setIsHeartModal] = useState(false);
	const [isDownloadModal, setIsDownloadModal] = useState(false);
	const [selectedRating, setSelectedRating] = useState(0); // 별점 상태 (0~6)
	const navigate = useNavigate();
	const [imageList, setImageList] = useState<{ id: number; url: string; myId: number; userId: number; postId: number; }[]>([]);
	const [contentModal, setContentModal] = useState(false);
	const accessToken = useAuthStore((state) => state.accessToken);
	const [postTitle, setPostTitle] = useState<string>("");
	const [postBody, setPostBody] = useState<string>("");
	const [selectedButtonText, setSelectedButtonText] = useState("워크스페이스"); // 기본값



	useEffect(() => {
		// 컴포넌트가 마운트되면 '내가 쓴 게시물'을 기본으로 불러옴
		fetchPosts('/myPage/posts', '내가 쓴 게시물', setImageList, setMessage);
	}, []); // 의존성 배열을 비워서 마운트 시에만 실행되게 함

	const [message, setMessage] = useState("아직 담긴 게시물이 없어요.");
	// const accessToken = useAuthStore((state) => state.accessToken);

	// 워크스페이스에서 GET API를 반복출력하는데, 이것이 템플릿인지 게시물인지 파악한 후 서로 다른 화면으로 서로 다른 데이터를 보내주어야 함
	// 템플릿 클릭 시 pdf 뷰어 열리고, pdf 뷰어에서 템플릿 수정(연필 버튼)을 이동
	// 게시물 클릭 시 바로 게시물 수정 화면으로 이동 

	const GoTemplateShow = () => { // 템플릿 보기
		setIsOverlayVisible(true);
	};

	const GoTemplateEdit = () => { // 템플릿 수정
		navigate('/writetemplatepage');
	}

	// const GoContentEdit = (id: number) => {
	// 	console.log('클릭한 게시물 ID는:', id);
	// 	navigate('/writecontentpage', { state: { id } });
	// };

	// imageList에서 myId 가져오기
	const myId = imageList.length > 0 ? imageList[0].myId : null;

	const fetchPostById = async (id: number) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
				headers: {
					"Accept": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.status === 200 && response.data.success) {
				console.log('게시물 상세 API 응답값:', response);
				setPostTitle(response.data.success.title);
				setPostBody(response.data.success.body);

				setContentModal(true);
			}
		} catch (error) {
			console.error(`게시물 ID ${id}의 데이터를 불러오는 중 오류 발생:`, error);
			alert("열람할 수 없는 게시물이에요.");
		}
	};

	const GoContentEdit = (id: number, userId: number, postId: number) => {
		console.log("클릭한 게시물 ID는:", id);
		console.log("게시물 작성자 userId는:", userId);
		console.log("현재 로그인된 사용자 myId는:", myId);

		// myId와 userId 비교 후 navigate 또는 alert
		if (myId === userId || myId === 1) {
			navigate("/writecontentpage", { state: { id } });
		} else {
			// alert("내가 쓴 게시물이 아니에요."); // 여기 게시물 모달로 바꾸기 
			// postId를 전달해서 게시물 상세 정보 API 요청하여 받아오고, 게시물 Modal 띄우고, Modal 내부 content로 넣기.
			// API 호출 결과 success이면 contentModal 띄우고, 오류나면 '열람할 수 없는 게시물이에요.' 띄우기
			fetchPostById(id);
		}
	};


	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	const handleOverlayClose = () => setIsOverlayVisible(false);

	// 좋아요 버튼 클릭 시
	const handleHeartClick = () => {
		setIsHeartClicked(!isHeartClicked); // 하트 상태
		setIsHeartModal(true); // 모달 상태
		setTimeout(() => {
			setIsHeartModal(false);
		}, 3000);
	};

	const handleDownloadClick = () => {
		setIsDownloadModal(true);
	}

	// 별점 매기기
	const handleRatingClick = (index: number) => {
		if (index + 1 === selectedRating) {
			// 별점 낮추기 (현재 선택된 별점을 다시 클릭하면 낮춤)
			setSelectedRating(index);
		} else {
			// 별점 올리기
			setSelectedRating(index + 1);
		}
	};

	// 템플릿 다운로드
	const handlePdfDownload = () => {
		// PDF 파일 경로
		const pdfUrl = pdfMock;

		const link = document.createElement('a');
		link.href = pdfUrl; // 다운로드할 파일의 경로
		link.download = 'template.pdf'; // 저장될 파일 이름
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		setIsDownloadModal(false);
	};

	const handleButtonClick = (endpoint: string, buttonText: string) => {
		fetchPosts(endpoint, buttonText, setImageList, setMessage);
		setSelectedButtonText(buttonText); // 클릭 시 상태 업데이트
		setIsDropdownOpen(false); // 드롭다운 닫기
	};


	return (
		<CustomColumn $width="50%" $minHeight="100vh" $alignitems="flex-start" $justifycontent="flex-start">
			<DropdownWrapper>
				<CustomButton onClick={toggleDropdown} $backgroundColor="white" $width="auto" $height='auto' $padding="0.5rem 1rem"
					$boxshadow='1px 2px 3px rgba(0, 0, 0, 0.1)' $borderRadius='3rem'>
					<CustomFont $color="black" $font="0.7rem">{selectedButtonText}</CustomFont>
					<FaChevronDown style={{ color: '#595959' }} />
				</CustomButton>
				{isDropdownOpen && (
					<DropdownMenu>
						<CustomColumn $width='100%' $alignitems='flex-start' $justifycontent='center' $gap="0.2rem">
							<CustomButton onClick={() => handleButtonClick('/myPage/posts', '내가 쓴 포스트')}
								$padding="0.5rem" $backgroundColor="white" $height='auto'>
								<CustomFont $color="black">내가 쓴 포스트</CustomFont>
							</CustomButton>
							<CustomDivider $width="100%" $height="0.8px" $backgroundcolor="#D9D9D9" />

							<CustomButton onClick={() => handleButtonClick('/myPage/recentPost', '최근 본 포스트')}
								$padding="0.5rem" $backgroundColor="white" $height='auto'>
								<CustomFont $color="black">최근 본 포스트</CustomFont>
							</CustomButton>
							<CustomDivider $width="100%" $height="0.8px" $backgroundcolor="#D9D9D9" />

							<CustomButton onClick={() => handleButtonClick('/myPage/likePost', '좋아요 누른 포스트')}
								$padding="0.5rem" $backgroundColor="white" $height='auto'>
								<CustomFont $color="black">좋아요 누른 포스트</CustomFont>
							</CustomButton>
							<CustomDivider $width="100%" $height="0.8px" $backgroundcolor="#D9D9D9" />

							<CustomButton onClick={() => handleButtonClick('/myPage/bookMark', '북마크한 포스트')}
								$padding="0.5rem" $backgroundColor="white" $height='auto'>
								<CustomFont $color="black">북마크한 포스트</CustomFont>
							</CustomButton>

						</CustomColumn>
					</DropdownMenu>
				)}
			</DropdownWrapper>
			{imageList.length > 0 ? (
				<GridContainer>
					{imageList.map((post, index) => (
						<CustomButton
							key={index}
							$width="auto"
							$height="auto"
							$padding="0"
							$backgroundColor="transparent"
							onClick={() => GoContentEdit(post.id, post.userId, post.postId)}
						>
							<ImageItem src={post.url ?? emptyThumbmail} alt={`Template ${index + 1}`} />
						</CustomButton>
					))}
				</GridContainer>
			) : (
				message && (
					<CustomColumn
						$width="100%"
						$minHeight="90vh"
						$alignitems="center"
						$justifycontent="center"
					>
						{/* <CustomFont $color='gray' $font='0.8rem'>{message}</CustomFont> */}
						<StyledImg src={emptySpace} />
					</CustomColumn>
				)
			)}

			<Modal isOpen={contentModal} onClose={() => setContentModal(false)}>
				<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
					<CustomFont $color="black" $fontweight="bold" $font="1.5rem">
						{postTitle}
					</CustomFont>
					<div
						style={{ width: "100%", margin: "1rem 0" }}
						dangerouslySetInnerHTML={{ __html: postBody }}
						className="post-content"
					/>
					<CustomRow $width="90%">
						<CustomButton $backgroundColor="transparent" onClick={() => setContentModal(false)}>
							<CustomFont $color="black" $fontweight="bold">닫기</CustomFont>
						</CustomButton>
					</CustomRow>
				</CustomColumn>
			</Modal>



			{/* 각종 모달들 여기로 다 분리해서 처리함 */}
			<WorkSpaceModals
				isOverlayVisible={isOverlayVisible}
				isHeartModal={isHeartModal}
				isDownloadModal={isDownloadModal}
				handleOverlayClose={handleOverlayClose}
				handleHeartClick={handleHeartClick}
				handleDownloadClick={handleDownloadClick}
				handleRatingClick={handleRatingClick}
				handlePdfDownload={handlePdfDownload}
				isHeartClicked={isHeartClicked}
				selectedRating={selectedRating}
				rankBeforeImages={rankBeforeImages}
				rankAfterImages={rankAfterImages}
				GoTemplateEdit={GoTemplateEdit}
			/>
		</CustomColumn>
	);
};

export default Workspace;