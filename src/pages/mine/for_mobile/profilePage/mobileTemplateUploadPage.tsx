import styled from "styled-components";
import CustomColumn from "../../components/CustomColumn";
import CustomButton from "../../components/CustomButton";
import CustomFont from "../../components/CustomFont";
import CustomDivider from "../../components/CustomDivider";
import CustomRow from "../../components/CustomRow";
import CustomBox from "../../components/CustomBox";
import StyledImg from "../../components/StyledImg";
import thumbnailMark from '../../../../assets/images/mine/thumbnail_upload_alert_img.svg';
import { useRef, useState } from "react";

const MobileTemplatePage = () => {
	const [fileName, setFileName] = useState("파일을 업로드해주세요.");
	const [thumbnail, setThumbnail] = useState(thumbnailMark);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const thumbnailInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFileName(e.target.files[0].name);
		}
	};

	const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const fileURL = URL.createObjectURL(e.target.files[0]);
			setThumbnail(fileURL);
		}
	};

	const getCurrentDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const day = String(today.getDate()).padStart(2, "0");
		return `${year}.${month}.${day}`;
	};

	return (
		<CustomColumn $width="90%" $minHeight="100vh" $alignitems="center" $justifycontent="center">
			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end" $gap="1rem">
				<CustomButton $width="auto" $height="auto" $padding="0.5rem" $backgroundColor="#FFE100">
					<CustomFont $color="black">게시/수정하기</CustomFont>
				</CustomButton>
				<CustomButton $width="auto" $height="auto" $padding="0.5rem" $backgroundColor="#FFE100">
					<CustomFont $color="black">삭제하기</CustomFont>
				</CustomButton>
			</CustomRow>

			<StyledInput placeholder="제목을 입력하세요" />

			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />
				<CustomFont $color="black">{getCurrentDate()}</CustomFont>
				<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />
			</CustomColumn>

			<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color="#D9D9D9" $font="1rem">파일 저장 가능 여부</CustomFont>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap="1rem">
					<label>
						<input type="radio" name="visibility" value="save" />
						<CustomFont $color="black">저장가능</CustomFont>
					</label>
					<label>
						<input type="radio" name="visibility" value="readable" />
						<CustomFont $color="black">열람가능</CustomFont>
					</label>
					<label>
						<input type="radio" name="visibility" value="private" />
						<CustomFont $color="black">비공개</CustomFont>
					</label>
				</CustomRow>
			</CustomColumn>


			<CustomRow $width="100%" $alignitems="center" $justifycontent="center">
				<CustomBox
					$width="80%"
					$height="auto"
					$padding="0.5rem"
					$border="1px solid #D9D9D9"
					$backgroundcolor="white"
					$alignitems="center"
					$justifycontent="flex-start"
				>
					<CustomFont $color="#D9D9D9">{fileName}</CustomFont>
				</CustomBox>
				<CustomButton
					$width="20%"
					$height="auto"
					$padding="0.5rem"
					$backgroundColor="#FFE100"
					onClick={() => fileInputRef.current?.click()}
				>
					<CustomFont $color="black" $font="0.8rem">
						파일
					</CustomFont>
				</CustomButton>
				<input
					ref={fileInputRef}
					id="fileUpload"
					type="file"
					onChange={handleFileUpload}
					style={{ display: "none" }}
				/>
			</CustomRow>

			<CustomBox
				$width="100%"
				$height="10rem"
				$alignitems="center"
				$justifycontent="center"
				$backgroundcolor="white"
				$border="1px solid #D9D9D9"
			>
				<StyledImg src={thumbnail} />
			</CustomBox>

			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton
					$width="auto"
					$height="auto"
					$padding="0.5rem"
					$backgroundColor="#FFE100"
					onClick={() => thumbnailInputRef.current?.click()}
				>
					<CustomFont $color="black">사진 추가하기</CustomFont>
				</CustomButton>
				<input
					ref={thumbnailInputRef}
					id="thumbnailUpload"
					type="file"
					onChange={handleThumbnailUpload}
					style={{ display: "none" }}
				/>
			</CustomRow>
		</CustomColumn>
	);
};

export default MobileTemplatePage;

const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: 1.5rem;
  width: 100%;
  border: none;
  outline: none;
  background-color: white;
  color: black;

  &:focus {
    border-color: #ffd700;
    box-shadow: 0 0 4px rgba(255, 215, 0, 0.8);
  }

  &::placeholder {
    color: #aaa;
    font-size: 1.5rem;
  }
`;
