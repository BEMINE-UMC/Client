// 마이페이지의 프로필과 연혁 컴포넌트, 나영 담당

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomColumn from "../components/CustomColumn";
import CustomRow from "../components/CustomRow";
import CustomFont from "../components/CustomFont";
import StyledImg from "../components/StyledImg";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
// import Modal from "../components/Modal";
import styled from "styled-components";

import mockProfileImg from '../../../assets/images/mockData/mockData_mine_ProfileImg.png';

const ResponsiveColumn = styled(CustomColumn)`
  width: 25%;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;

  @media (max-width: 1024px) {
    width: 80%;
    min-height: auto;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    width: 90%;
    min-height: auto;
    gap: 1.5rem;
  }
`;

const ResponsiveInnerColumn = styled(CustomColumn)`
  width: 70%;
  height: auto;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 1024px) {
    width: 90%;
    gap: 0.4rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.3rem;
  }
`;

const ResponsiveImg = styled(StyledImg)`
  width: 100%;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    border-radius: 0.3rem;
  }
`;

const ResponsiveButtonRow = styled(CustomRow)`
  width: 70%;
  height: auto;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  @media (max-width: 1024px) {
    width: 90%;
    gap: 0.4rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 0.3rem;
  }
`;

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
	const [editModal, setEditModal] = useState(false);

	const GoWriteContent = () => {
		navigate('/writecontentpage');
	}

	const GoWriteTemplate = () => {
		navigate('/writetemplatepage');
	}

	const handleEdit = () => {
		setEditModal(true);
	};

	const Back = () => {
		setEditModal(false);
	};

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
		setEditModal(false);
		setProfileData(tempData);
		setIsEditing(false);
	};

	return (
		<ResponsiveColumn>
			<ResponsiveInnerColumn>
				<ResponsiveImg src={profileImage} />
				<CustomRow $width="100%" $justifycontent="flex-end">
					<CustomButton as="label" $backgroundColor="black" $padding="0.5rem" $width="auto" $height="auto">
						<CustomFont $color="white" $fontweight="bold">수정하기</CustomFont>
						<input type="file" onChange={handleImageUpload} style={{ display: "none" }} />
					</CustomButton>
				</CustomRow>
			</ResponsiveInnerColumn>

			<ResponsiveInnerColumn>
				<CustomFont $color="black" $font="2rem" $fontweight="bold">{profileData.name}</CustomFont>
				<CustomFont $color="black" $font="1rem" $fontweight="bold">{profileData.tagline}</CustomFont>
			</ResponsiveInnerColumn>

			<ResponsiveInnerColumn>
				{isEditing
					? tempData.sections.map((section, index) => (
						<>
							<CustomInput key={`title-${index}`} value={section.title} onChange={(e) => handleInputChange(index, "title", e.target.value)} placeholder={`${section.title}`} />
							<CustomInput key={`content-${index}`} value={section.content} onChange={(e) => handleInputChange(index, "content", e.target.value)} placeholder={`${section.content}`} />
						</>
					))
					: profileData.sections.map((section, index) => (
						<>
							<CustomFont key={`title-${index}`} $color="#686868" $font="0.8rem" $fontweight="bold">{section.title}</CustomFont>
							<CustomFont key={`content-${index}`} $color="#686868" $font="0.8rem">{section.content}</CustomFont>
						</>
					))}
			</ResponsiveInnerColumn>

			<ResponsiveButtonRow>
				{isEditing ? (
					<>
						<CustomButton $backgroundColor="black" $padding="0.5rem" $width="7rem" $height="auto" onClick={handleCancelEdit}>
							<CustomFont $color="white" $font="0.7rem">수정 취소</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor={allFieldsFilled ? "yellow" : "#D9D9D9"} $padding="0.5rem" $width="7rem" $height="auto" onClick={handleEdit} disabled={!allFieldsFilled}>
							<CustomFont $color={allFieldsFilled ? "black" : "white"} $font="0.7rem">수정 완료</CustomFont>
						</CustomButton>
					</>
				) : (
					<>
						<CustomButton $backgroundColor="black" $padding="0.5rem" $width="7rem" $height="auto" onClick={handleEditClick}>
							<CustomFont $color="white" $font="0.7rem">연혁 수정</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="black" $padding="0.5rem" $width="7rem" $height="auto" onClick={GoWriteContent}>
							<CustomFont $color="white" $font="0.7rem">게시물 작성</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="black" $padding="0.5rem" $width="7rem" $height="auto" onClick={GoWriteTemplate}>
							<CustomFont $color="white" $font="0.7rem">템플릿 등록</CustomFont>
						</CustomButton>
					</>
				)}
			</ResponsiveButtonRow>
		</ResponsiveColumn>
	);
};

export default Profile;
