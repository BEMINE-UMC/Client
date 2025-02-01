import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useState } from 'react';
import CustomColumn from "../components/CustomColumn";
import CustomFont from "../components/CustomFont";
import CustomButton from "../components/CustomButton";
import CustomBox from '../components/CustomBox';

import { FaChevronDown } from 'react-icons/fa';
import { IoIosHeart } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { IoMdChatbubbles } from "react-icons/io";
import logo from '../../../assets/images/main/BeMine_3D.png';

import template1 from '../../../assets/images/mockData/mockData_mine_template_1.png';
import template2 from '../../../assets/images/mockData/mockData_mine_template_2.png';
import template3 from '../../../assets/images/mockData/mockData_mine_template_3.png';
import template4 from '../../../assets/images/mockData/mockData_mine_template_4.png';
import pdfMock from '../../../assets/images/mine/mine_PDF_mockData.pdf';
import CustomRow from '../components/CustomRow';
import StyledImg from '../components/StyledImg';

import rank_before_1 from '../../../assets/images/mine/rank_img/mine_rank_before_1.svg';
import rank_before_2 from '../../../assets/images/mine/rank_img/mine_rank_before_2.svg';
import rank_before_3 from '../../../assets/images/mine/rank_img/mine_rank_before_3.svg';
import rank_before_4 from '../../../assets/images/mine/rank_img/mine_rank_before_4.svg';
import rank_before_5 from '../../../assets/images/mine/rank_img/mine_rank_before_5.svg';
import rank_before_6 from '../../../assets/images/mine/rank_img/mine_rank_before_6.svg';

import rank_after_1 from '../../../assets/images/mine/rank_img/mine_rank_after_1.svg';
import rank_after_2 from '../../../assets/images/mine/rank_img/mine_rank_after_2.svg';
import rank_after_3 from '../../../assets/images/mine/rank_img/mine_rank_after_3.svg';
import rank_after_4 from '../../../assets/images/mine/rank_img/mine_rank_after_4.svg';
import rank_after_5 from '../../../assets/images/mine/rank_img/mine_rank_after_5.svg';
import rank_after_6 from '../../../assets/images/mine/rank_img/mine_rank_after_6.svg';

const mockDataTemplates = [
	template1,
	template2,
	template3,
	template4
];

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

const Workspace = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const [isHeartClicked, setIsHeartClicked] = useState(false);
	const [isHeartModal, setIsHeartModal] = useState(false);
	const [isDownloadModal, setIsDownloadModal] = useState(false);
	const [selectedRating, setSelectedRating] = useState(0); // 별점 상태 (0~6)
	const navigate = useNavigate();

	const GoTemplateShow = () => { // 템플릿 보기
		setIsOverlayVisible(true);
	};

	const GoTemplateEdit = () => { // 템플릿 수정
		navigate('/writetemplatepage');
	}

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


	return (
		<CustomColumn $width="50%" $minHeight="100vh" $alignitems="flex-start" $justifycontent="flex-start">
			<DropdownWrapper>
				<CustomButton onClick={toggleDropdown} $backgroundColor="white" $width="auto" $height='auto' $padding="0.5rem 1rem"
					$boxshadow='1px 2px 3px rgba(0, 0, 0, 0.1)' $borderRadius='3rem'>
					<CustomFont $color="black" $font="0.7rem" $fontweight='bold'>워크스페이스</CustomFont>
					<FaChevronDown style={{ color: '#595959' }} />
				</CustomButton>
				{isDropdownOpen && (
					<DropdownMenu>
						<CustomColumn $width='100%' $alignitems='flex-start' $justifycontent='center'>
							<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
								<CustomFont $color="black" $fontweight='bold'>최근 본 게시물</CustomFont>
							</CustomButton>
							<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
								<CustomFont $color="black" $fontweight='bold'>좋아요 누른 게시물</CustomFont>
							</CustomButton>
							<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
								<CustomFont $color="black" $fontweight='bold'>북마크한 게시물</CustomFont>
							</CustomButton>
						</CustomColumn>
					</DropdownMenu>
				)}
			</DropdownWrapper>

			<GridContainer>
				{mockDataTemplates.map((src, index) => (
					<CustomButton $width='auto' $height='auto' $padding='0' $backgroundColor='transparent' onClick={GoTemplateShow} key={index}>
						<ImageItem src={src} alt={`Template ${index + 1}`} />
					</CustomButton>
				))}
			</GridContainer>

			{isOverlayVisible && (
				<Overlay onClick={handleOverlayClose}>
					<PdfContainer onClick={(e) => e.stopPropagation()}>
						<embed src={pdfMock} type="application/pdf" width="100%" height="100%" />

						<FloatingButtons>
							<IoIosHeart
								size={40}
								color={isHeartClicked ? "red" : "gray"}
								onClick={handleHeartClick}
								style={{ cursor: 'pointer' }}
							/>
							<FaFileDownload size={40} style={{ cursor: 'pointer', color: 'gray' }} onClick={handleDownloadClick} />
							<BiSolidPencil size={40} style={{ cursor: 'pointer', color: 'gray' }} onClick={GoTemplateEdit} />
							<IoMdChatbubbles size={40} style={{ cursor: 'pointer', color: 'gray' }} />
						</FloatingButtons>
					</PdfContainer>
				</Overlay>
			)}

			{isHeartModal && (
				<HeartModal $backgroundcolor='white' $borderradius='1rem' $width='80%' $height='auto' $padding='1rem' $boxshadow='rgba(0 0 0 0.2)'>
					<CustomRow $width='100%' $alignitems='center' $justifycontent='center'>
						<StyledImg src={logo} $width='3rem' />
						<CustomColumn>
							<CustomFont $color='black' $font='1rem' $fontweight='bold'>내가 찜한 템플릿을 다운로드 받아보세요!</CustomFont>
							<CustomFont $color='black' $font='0.8rem'>PDF 파일로 다운로드하여 사용할 수 있어요.</CustomFont>
						</CustomColumn>
					</CustomRow>
				</HeartModal>
			)}

			{isDownloadModal && (
				<DownloadModal $backgroundcolor='white' $borderradius='1rem' $width='80%' $height='auto' $padding='1rem' $boxshadow='rgba(0 0 0 0.2)'>
					<CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
						<StyledImg src={logo} $width="5rem" />
						<CustomFont $color="black" $font="1.3rem" $fontweight="bold">해당 템플릿이 마음에 드셨나요?</CustomFont>
						<CustomFont $color="black" $font="1rem">인증 뱃지를 위해 별점을 남겨주세요.</CustomFont>

						{/* 별점 매기기 UI */}
						<CustomRow $width="auto" $justifycontent="center" $gap="0.5rem">
							{rankBeforeImages.map((beforeImage, index) => (
								<StyledImg
									key={index}
									src={index < selectedRating ? rankAfterImages[index] : beforeImage}
									$width="3rem"
									$height="3rem"
									$cursor="pointer"
									onClick={() => handleRatingClick(index)}
								/>
							))}
						</CustomRow>

						<CustomFont $color="#666666" $font="1rem">별점을 매겨주신 후 템플릿이 다운로드 돼요!</CustomFont>
						<CustomButton $backgroundColor={selectedRating > 0 ? "#FFE100" : "#D9D9D9"} $padding="0.5rem" $width='auto' $height='auto' onClick={handlePdfDownload}>
							<CustomFont $color="white" $fontweight="bold">다음</CustomFont>
						</CustomButton>
					</CustomColumn>
				</DownloadModal>
			)}
		</CustomColumn>
	);
};

export default Workspace;


const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 10rem;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1rem;
    z-index: 10;
`;

const GridContainer = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const ImageItem = styled.img`
    width: 100%;
    border-radius: 0.5rem;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const PdfContainer = styled.div`
    max-width: 90%;
	min-width: 80%;
    height: 80%;
    background: transparent;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: row;
	gap: 1rem;
    justify-content: center;
    align-items: flex-start;
`;

const FloatingButtons = styled.div`
	display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const HeartModal = styled(CustomBox)`
	position: absolute;
	top: 3rem;
	left: 50%;
	transform: translateX(-50%);
	z-index: 200;
	background-color: white;
	border-radius: 1rem;
	width: 80%;
	padding: 1rem;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const DownloadModal = styled(CustomBox)`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 200;
	background-color: white;
	border-radius: 1rem;
	width: 60%;
	padding: 1rem;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
`;