import React from "react";
import { IoIosHeart } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { IoMdChatbubbles } from "react-icons/io";

import CustomColumn from "../../components/CustomColumn";
import CustomRow from "../../components/CustomRow";
import CustomFont from "../../components/CustomFont";
import StyledImg from "../../components/StyledImg";
import CustomButton from "../../components/CustomButton";

import {
	Overlay,
	PdfContainer,
	FloatingButtons,
	HeartModal,
	DownloadModal,
} from "./WorkSpaceStyles";

import pdfMock from '../../../../assets/images/mine/mine_PDF_mockData.pdf';
import logo from '../../../../assets/images/main/BeMine_3D.png';

// 워크스페이스에서 클릭하여 나오는 모든 Modal들

interface WorkSpaceModalsProps {
	isOverlayVisible: boolean;
	isHeartModal: boolean;
	isDownloadModal: boolean;
	handleOverlayClose: () => void;
	handleHeartClick: () => void;
	handleDownloadClick: () => void;
	handleRatingClick: (index: number) => void;
	handlePdfDownload: () => void;
	isHeartClicked: boolean;
	selectedRating: number;
	rankBeforeImages: string[];
	rankAfterImages: string[];
	GoTemplateEdit: () => void;
}

const WorkSpaceModals: React.FC<WorkSpaceModalsProps> = ({
	isOverlayVisible,
	isHeartModal,
	isDownloadModal,
	handleOverlayClose,
	handleHeartClick,
	handleDownloadClick,
	handleRatingClick,
	handlePdfDownload,
	isHeartClicked,
	selectedRating,
	rankBeforeImages,
	rankAfterImages,
	GoTemplateEdit,
}) => {
	return (
		<>
			{/* PDF 오버레이 */}
			{isOverlayVisible && (
				<Overlay onClick={handleOverlayClose}>
					<PdfContainer onClick={(e) => e.stopPropagation()}>
						<embed src={pdfMock} type="application/pdf" width="100%" height="100%" />
						<FloatingButtons>
							<IoIosHeart
								size={40}
								color={isHeartClicked ? "red" : "gray"}
								onClick={handleHeartClick}
								style={{ cursor: "pointer" }}
							/>
							<FaFileDownload size={40} style={{ cursor: "pointer", color: "gray" }} onClick={handleDownloadClick} />
							<BiSolidPencil size={40} style={{ cursor: "pointer", color: "gray" }} onClick={GoTemplateEdit} />
							<IoMdChatbubbles size={40} style={{ cursor: "pointer", color: "gray" }} />
						</FloatingButtons>
					</PdfContainer>
				</Overlay>
			)}

			{/* 하트 모달 */}
			{isHeartModal && (
				<HeartModal $backgroundcolor="white" $borderradius="1rem" $width="80%" $height="auto" $padding="1rem" $boxshadow="rgba(0 0 0 0.2)">
					<CustomRow $width="100%" $alignitems="center" $justifycontent="center">
						<StyledImg src={logo} $width="3rem" />
						<CustomColumn>
							<CustomFont $color="black" $font="1rem" $fontweight="bold">내가 찜한 템플릿을 다운로드 받아보세요!</CustomFont>
							<CustomFont $color="black" $font="0.8rem">PDF 파일로 다운로드하여 사용할 수 있어요.</CustomFont>
						</CustomColumn>
					</CustomRow>
				</HeartModal>
			)}

			{/* 다운로드 모달 */}
			{isDownloadModal && (
				<DownloadModal $backgroundcolor="white" $borderradius="1rem" $width="80%" $height="auto" $padding="1rem" $boxshadow="rgba(0 0 0 0.2)">
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
						<CustomButton $backgroundColor={selectedRating > 0 ? "#FFE100" : "#D9D9D9"} $padding="0.5rem" $width="auto" $height="auto" onClick={handlePdfDownload}>
							<CustomFont $color="white" $fontweight="bold">다음</CustomFont>
						</CustomButton>
					</CustomColumn>
				</DownloadModal>
			)}
		</>
	);
};

export default WorkSpaceModals;
