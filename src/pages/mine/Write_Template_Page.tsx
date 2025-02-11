import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

import CustomColumn from "./components/CustomColumn";
import CustomBox from "./components/CustomBox";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import CustomFont from "./components/CustomFont";
import StyledImg from "./components/StyledImg";
import upload from '../../assets/images/mine/icon_mine_upload.svg';
import CustomRow from "./components/CustomRow";
import Modal from "./components/Modal";
import { handleUpload } from "./apis/handleUpload";

const UploadButton = styled(CustomButton)`
	min-width: 40%;
	width: auto;
	min-height: 30vh;
	height: auto;
`;

const WriteTemplatePage = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const [profileImage, setProfileImage] = useState(upload);
	const [title, setTitle] = useState("");
	const [filePermission, setFilePermission] = useState("저장 가능");
	// const [category, setCategory] = useState("콘텐츠 마케터");
	const [uploadedFileName, setUploadedFileName] = useState("템플릿 파일 올리기");
	const [writeModal, setWriteModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const navigate = useNavigate();

	const categoryMapping: Record<string, number> = {
		"콘텐츠 마케터": 1,
		"브랜드 마케터": 2,
		"퍼포먼스 마케터": 3,
		"바이럴 마케터": 4,
	};

	// category의 상태를 categoryMapping의 키 타입으로 지정
	const [category, setCategory] = useState<keyof typeof categoryMapping>("콘텐츠 마케터");

	// categoryId를 가져올 때 기본값 설정 (예: category가 유효하지 않으면 기본값 1)
	const categoryId = categoryMapping[category] ?? 1;


	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setThumbnailFile(file);

			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setProfileImage(e.target.result.toString());
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setUploadedFileName(file.name);
			setPdfFile(file);
		}
	};

	const handleUploadClick = async () => {
		if (!isButtonEnabled) return;

		if (!accessToken) {
			alert("로그인이 필요합니다.");
			return;
		}

		if (!pdfFile || !thumbnailFile) {
			alert("파일과 썸네일을 업로드해주세요.");
			console.log("pdfFile 또는 thumbnailFile이 null입니다.");
			return;
		}

		// fileShareState 값 설정 (비공개일 경우만 "private")
		const fileShareState = filePermission === "비공개" ? "private" : "public";

		// API 요청 함수 호출
		const success = await handleUpload(title, pdfFile, fileShareState, thumbnailFile, categoryId, accessToken);
		// console.log('요청 보내진 값들은:');
		// console.log(title);
		// console.log(pdfFile);
		// console.log(fileShareState);
		// console.log(thumbnailFile);
		// console.log(categoryId);
		// console.log(accessToken);

		// 성공하면 모달 닫기
		if (success) {
			setWriteModal(false);
			navigate('/my');
		}
	};

	useEffect(() => {
		const isThumbnailUploaded = profileImage !== upload;
		const isFileUploaded = uploadedFileName !== "템플릿 파일 올리기";
		const isTitleFilled = title.trim() !== "";

		setIsButtonEnabled(isThumbnailUploaded && isFileUploaded && isTitleFilled);
	}, [profileImage, uploadedFileName, title]);

	const handlePublish = () => {
		if (isButtonEnabled) {
			setWriteModal(true);
		}
	};

	const handleDelete = () => {
		setDeleteModal(true);
	};

	const CloseWriteModal = () => {
		setWriteModal(false);
	}

	const CloseDeleteModal = () => {
		setDeleteModal(false);
	}

	return (
		<CustomColumn $width="90%" $minHeight="100vh" $alignitems="flex-start" $justifycontent="flex-start" $padding="2rem" $gap="2rem">
			<UploadButton as='label' $backgroundColor="white" $border="1px solid #D9D9D9" $borderRadius="1rem"
				$alignItems="center" $justifyContent="center">
				<CustomColumn>
					{profileImage === upload && <CustomFont $color="black">템플릿 썸네일</CustomFont>}
					<StyledImg src={profileImage} />
				</CustomColumn>
				<input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
			</UploadButton>

			<CustomRow $width="90%" $height="auto" $alignitems="center" $justifycontent="space-between">
				<CustomBox $backgroundcolor="white" $alignitems="flex-start" $justifycontent="center" $padding="0.5rem" $border="1px solid #D9D9D9"
					$borderradius="0.5rem" $width="90%" $height="auto">
					<CustomFont $color="#666666" $fontweight="bold">{uploadedFileName}</CustomFont>
				</CustomBox>
				<CustomButton as='label' $width='10%' $height='auto' $alignItems="center" $justifyContent="center" $padding="0.5rem" $backgroundColor="#FFE100"
					$borderRadius="0.5rem">
					<CustomFont $color="black" $fontweight="bold">파일</CustomFont>
					<input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
				</CustomButton>
			</CustomRow>

			<CustomRow $width="90%">
				<CustomInput placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
			</CustomRow>

			<CustomColumn $width="90%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color="#666666" $font="1rem" $fontweight="bold">파일 저장 가능 유무</CustomFont>
				<CustomRow $width="90%" $alignitems="center" $justifycontent="flex-start">
					<label>
						<input type="radio" name="filePermission" value="저장 가능" checked={filePermission === "저장 가능"} onChange={() => setFilePermission("저장 가능")} />
						<CustomFont $color="black" $fontweight="bold">저장 가능</CustomFont>
					</label>
					<label>
						<input type="radio" name="filePermission" value="열람만 가능" checked={filePermission === "열람만 가능"} onChange={() => setFilePermission("열람만 가능")} />
						<CustomFont $color="black" $fontweight="bold">열람 가능</CustomFont>
					</label>
					<label>
						<input type="radio" name="filePermission" value="비공개" checked={filePermission === "비공개"} onChange={() => setFilePermission("비공개")} />
						<CustomFont $color="black" $fontweight="bold">비공개</CustomFont>
					</label>
				</CustomRow>
			</CustomColumn>

			<CustomColumn $width="90%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color="#666666" $font="1rem" $fontweight="bold">카테고리 선택</CustomFont>
				<CustomRow $width="90%" $alignitems="center" $justifycontent="flex-start">
					<label>
						<input type="radio" name="category" value="콘텐츠 마케터" checked={category === "콘텐츠 마케터"} onChange={() => setCategory("콘텐츠 마케터")} />
						<CustomFont $color="black" $fontweight="bold">콘텐츠 마케터</CustomFont>
					</label>
					<label>
						<input type="radio" name="category" value="브랜드 마케터" checked={category === "브랜드 마케터"} onChange={() => setCategory("브랜드 마케터")} />
						<CustomFont $color="black" $fontweight="bold">브랜드 마케터</CustomFont>
					</label>
					<label>
						<input type="radio" name="category" value="퍼포먼스 마케터" checked={category === "퍼포먼스 마케터"} onChange={() => setCategory("퍼포먼스 마케터")} />
						<CustomFont $color="black" $fontweight="bold">퍼포먼스 마케터</CustomFont>
					</label>
					<label>
						<input type="radio" name="category" value="바이럴 마케터" checked={category === "바이럴 마케터"} onChange={() => setCategory("바이럴 마케터")} />
						<CustomFont $color="black" $fontweight="bold">바이럴 마케터</CustomFont>
					</label>
				</CustomRow>
			</CustomColumn>

			<CustomRow $width="90%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton
					$width='5rem'
					$height='auto'
					$padding="0.5rem"
					$backgroundColor={isButtonEnabled ? "#FFE100" : "#D9D9D9"}
					onClick={handlePublish}
					disabled={!isButtonEnabled}
				>
					<CustomFont $color="black" $fontweight="bold">수정/게시</CustomFont>
				</CustomButton>
				<CustomButton $width='5rem' $height='auto' $padding="0.5rem" $backgroundColor="#FFE100" onClick={handleDelete}>
					<CustomFont $color="black" $fontweight="bold">삭제</CustomFont>
				</CustomButton>
			</CustomRow>

			<Modal isOpen={writeModal} onClose={CloseWriteModal}>
				<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
					<CustomFont $color='black' $fontweight='bold'>게시하시겠습니까?</CustomFont>
					<CustomRow $width="90%">
						<CustomButton $backgroundColor="transparent" onClick={CloseWriteModal}>
							<CustomFont $color='black' $fontweight='bold'>취소</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="#FFE100" onClick={handleUploadClick}>
							<CustomFont $color='black' $fontweight='bold'>게시하기</CustomFont>
						</CustomButton>
					</CustomRow>
				</CustomColumn>
			</Modal>

			<Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
				<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
					<CustomFont $color='black' $fontweight='bold'>삭제하시겠습니까?</CustomFont>
					<CustomRow $width="90%">
						<CustomButton $backgroundColor="transparent" onClick={CloseDeleteModal}>
							<CustomFont $color='black' $fontweight='bold'>취소</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="#FFE100">
							<CustomFont $color='black' $fontweight='bold'>삭제하기</CustomFont>
						</CustomButton>
					</CustomRow>
				</CustomColumn>
			</Modal>
		</CustomColumn>
	);
}

export default WriteTemplatePage;
