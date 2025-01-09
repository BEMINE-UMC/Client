// 마이페이지의 프로필과 연혁 컴포넌트, 나영 담당

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomColumn from "../components/CustomColumn";
import CustomRow from "../components/CustomRow";
import CustomFont from "../components/CustomFont";
import StyledImg from "../components/StyledImg";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import mockProfileImg from '../../../assets/images/mockData/mockData_mine_ProfileImg.png';

const initialProfileData = {
	name: "유궁둔",
	tagline: "멋진 콘텐츠 마케터가 되고싶은",
	sections: [
		{ title: "1. 학력 및 전공", content: "여기에 데이터 데이터..." },
		{ title: "2. 주요 경험", content: "경험 1 경험 2 경험 3~" },
		{ title: "3. 기타 활동", content: "인턴, 대외활동, 공모전..." },
		{ title: "4. 주요 역량 및 성과", content: "수상 1, 수상 2, 수상 3, 수상 4..." }
	]
};

const Profile = () => {
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState(initialProfileData);
	const [tempData, setTempData] = useState({ ...initialProfileData });
	const [profileImage, setProfileImage] = useState(mockProfileImg);

	const GoWriteContent = () => {
		navigate('/writecontentpage');
	}

	const GoWriteTemplate = () => {
		navigate('/writetemplatepage');
	}

	const handleInputChange = (index: number, key: 'title' | 'content', value: string) => {
		setTempData(prevTempData => {
			const updatedSections = [...prevTempData.sections];
			updatedSections[index] = { ...updatedSections[index], [key]: value };
			return { ...prevTempData, sections: updatedSections };
		});
	};

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

	const allFieldsFilled = tempData.sections.every(section => section.title.trim() !== "" && section.content.trim() !== "");

	const handleEditClick = () => {
		setIsEditing(true);
		setTempData({ ...profileData });
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setTempData({ ...profileData });
	};

	const handleConfirmEdit = () => {
		if (window.confirm('정말 수정하시겠습니까?')) {
			setProfileData(tempData);
			setIsEditing(false);
		}
	};

	return (
		<CustomColumn $width="25%" $minHeight="100vh" $alignitems="center" $justifycontent="flex-start" $gap="3rem">
			<CustomColumn $width="70%" $height="auto" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<StyledImg src={profileImage} $width="100%" $borderradius="0.5rem" />
				<CustomRow $width="100%" $justifycontent="flex-end">
					<CustomButton as="label" $backgroundColor="black" $padding="0.5rem" $width='auto' $height='auto'>
						<CustomFont $color="white" $fontweight="bold">수정하기</CustomFont>
						<input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
					</CustomButton>
				</CustomRow>
			</CustomColumn>

			<CustomColumn $width="70%" $height="auto" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color="black" $font="2rem" $fontweight="bold">{profileData.name}</CustomFont>
				<CustomFont $color="black" $font="1rem" $fontweight="bold">{profileData.tagline}</CustomFont>
			</CustomColumn>

			<CustomColumn $width="70%" $height="auto" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				{isEditing ? (
					tempData.sections.map((section, index) => (
						<>
							<CustomInput key={`title-${index}`} value={section.title} onChange={(e) => handleInputChange(index, 'title', e.target.value)} placeholder={`${section.title}`} />
							<CustomInput key={`content-${index}`} value={section.content} onChange={(e) => handleInputChange(index, 'content', e.target.value)} placeholder={`${section.content}`} />
						</>
					))
				) : (
					profileData.sections.map((section, index) => (
						<>
							<CustomFont key={`title-${index}`} $color="#686868" $font="0.8rem" $fontweight="bold">{section.title}</CustomFont>
							<CustomFont key={`content-${index}`} $color="#686868" $font="0.8rem">{section.content}</CustomFont>
						</>
					))
				)}
			</CustomColumn>

			<CustomRow $width="70%" $height="auto" $alignitems="center" $justifycontent="flex-end" $gap="0.5rem">
				{isEditing ? (
					<>
						<CustomButton $backgroundColor="black" $padding="0.5rem" $width='7rem' $height='auto' onClick={handleCancelEdit}>
							<CustomFont $color="white" $font="0.7rem">수정 취소</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor={allFieldsFilled ? "yellow" : "#D9D9D9"} $padding="0.5rem" $width='7rem' $height='auto' onClick={handleConfirmEdit} disabled={!allFieldsFilled}>
							<CustomFont $color={allFieldsFilled ? "black" : "white"} $font="0.7rem">수정 완료</CustomFont>
						</CustomButton>
					</>
				) : (
					<CustomButton $backgroundColor="black" $padding="0.5rem" $width='7rem' $height='auto' onClick={handleEditClick}>
						<CustomFont $color="white" $font="0.7rem">연혁 수정</CustomFont>
					</CustomButton>
				)}

				{isEditing ? (<></>) : (
					<>
						<CustomButton $backgroundColor="black" $padding="0.5rem" $width='7rem' $height='auto' onClick={GoWriteContent}>
							<CustomFont $color="white" $font="0.7rem">게시물 작성</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="black" $padding="0.5rem" $width='7rem' $height='auto' onClick={GoWriteTemplate}>
							<CustomFont $color="white" $font="0.7rem">템플릿 등록</CustomFont>
						</CustomButton>
					</>
				)}
			</CustomRow>
		</CustomColumn>
	);
};

export default Profile;
