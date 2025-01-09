// 템플릿 게시 UI, 나영 담당

import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomColumn from "./components/CustomColumn";
import CustomBox from "./components/CustomBox";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import CustomFont from "./components/CustomFont";
import StyledImg from "./components/StyledImg";
import upload from '../../assets/images/mine/icon_mine_upload.svg';
import CustomRow from "./components/CustomRow";

const UploadButton = styled(CustomButton)`
	min-width: 40%;
	width: auto;
	min-height: 30vh;
	height: auto;
`;

const WriteTemplatePage = () => {
	const navigate = useNavigate();
	const [profileImage, setProfileImage] = useState(upload);
	const [title, setTitle] = useState("");
	const [filePermission, setFilePermission] = useState("저장 가능");
	const [uploadedFileName, setUploadedFileName] = useState("템플릿 파일 올리기");

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setProfileImage(e.target.result.toString());
				}
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setUploadedFileName(event.target.files[0].name);
		}
	};

	const handlePublish = () => {
		if (window.confirm('이 템플릿을 게시하시겠습니까?')) {
			navigate('/template');
		}
	};

	const handleDelete = () => {
		if (window.confirm('이 템플릿을 삭제하시겠습니까?')) {
			navigate('/template');
		}
	};

	return (
		<CustomColumn $width="100vw" $minHeight="100vh" $alignitems="flex-start" $justifycontent="flex-start" $padding="2rem" $gap="2rem">
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
				<CustomInput placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)}></CustomInput>
			</CustomRow>

			<CustomColumn $width="90%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color="#666666" $font="1rem" $fontweight="bold">파일 저장 가능 유무</CustomFont>
				<CustomRow $width="90%" $alignitems="center" $justifycontent="flex-start">
					<label>
						<input type="radio" name="filePermission" value="저장 가능" checked={filePermission === "저장 가능"} onChange={() => setFilePermission("저장 가능")} />
						저장 가능
					</label>
					<label>
						<input type="radio" name="filePermission" value="열람만 가능" checked={filePermission === "열람만 가능"} onChange={() => setFilePermission("열람만 가능")} />
						열람만 가능
					</label>
					<label>
						<input type="radio" name="filePermission" value="비공개" checked={filePermission === "비공개"} onChange={() => setFilePermission("비공개")} />
						비공개
					</label>
				</CustomRow>
			</CustomColumn>

			<CustomRow $width="90%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton $width='5rem' $height='auto' $padding="0.5rem" $backgroundColor="#FFE100" onClick={handlePublish}>
					<CustomFont $color="black" $fontweight="bold">게시</CustomFont>
				</CustomButton>
				<CustomButton $width='5rem' $height='auto' $padding="0.5rem" $backgroundColor="#FFE100" onClick={handleDelete}>
					<CustomFont $color="black" $fontweight="bold">삭제</CustomFont>
				</CustomButton>
			</CustomRow>
		</CustomColumn>
	);
}

export default WriteTemplatePage;
