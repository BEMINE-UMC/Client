import styled from "styled-components";
import { useState } from "react";
import CustomColumn from "../../components/CustomColumn";
import CustomRow from "../../components/CustomRow";
import CustomFont from "../../components/CustomFont";
import StyledImg from "../../components/StyledImg";
import { IoPencilOutline } from "react-icons/io5";
import mockProfileImg from "../../../../assets/images/mockData/mockData_mine_ProfileImg.png";
import CustomButton from "../../components/CustomButton";

// 초기 프로필 데이터 관리
const initialProfileData = {
	name: "유궁둔",
	tagline: "멋진 콘텐츠 마케터가 되고싶은",
	sections: [
		{
			title: "1. 학력 및 전공",
			content: "전공: 미디어 커뮤니케이션 학과\n관련 과목: 디지털 마케팅, 콘텐츠 기획, 커뮤니케이션 전략",
		},
		{
			title: "2. 주요 경험",
			content:
				"인턴십: 스타트업 A사 (6개월):SNS 콘텐츠 기획 및 운영. 주요 플랫폼: Instagram, YouTube.\n\n2개월 만에 팔로워 3,000명 증가 성과.\n대기업 B사 (4개월):디지털 광고 캠페인 분석 및 보고서 작성. 구글 애널리틱스를 활용한 성과 분석.",
		},
		{
			title: "3. 기타 활동",
			content:
				"개인 프로젝트: '커피 브랜드 C' 가상 마케팅 캠페인 기획. Google Ads와 페이스북 광고 시뮬레이션 제작.\n온라인 강의 수료:구글 디지털 마케팅 전문가 과정. Meta Blueprint: Facebook 마케팅.",
		},
		{
			title: "4. 주요 역량 및 성과",
			content:
				"마케팅 툴: Google Analytics, Facebook Ads Manager, Canva.\n성과 중심의 기획 능력:전 회사에서 월간 콘텐츠 도달률 200% 증가 달성. 팀 프로젝트로 캠페인 기획 및 실행.",
		},
	],
};

const MobileProfilePage = () => {
	const [profileData, setProfileData] = useState(initialProfileData);
	const [isEditing, setIsEditing] = useState(false);
	const [editedTagline, setEditedTagline] = useState(profileData.tagline);
	const [isEditingSections, setIsEditingSections] = useState(false);
	const [editedSections, setEditedSections] = useState(profileData.sections);

	const handleSectionEditClick = () => {
		setIsEditingSections(true);
	};

	const handleSectionInputChange = (index: number, value: string) => {
		const updatedSections = [...editedSections];
		updatedSections[index].content = value;
		setEditedSections(updatedSections);
	};

	const handleSectionSaveClick = () => {
		setProfileData({ ...profileData, sections: editedSections });
		setIsEditingSections(false);
	};

	const allSectionsFilled = editedSections.every((section) => section.content.trim() !== "");


	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedTagline(e.target.value);
	};

	const handleSaveClick = () => {
		setProfileData({ ...profileData, tagline: editedTagline });
		setIsEditing(false);
	};

	return (
		<CustomColumn $width="90%" $minHeight="100vh" $alignitems="center" $justifycontent="center">
			{/* 상단 프로필 정보 */}
			<CustomRow $width="100%" $height="auto" $padding="1rem" $gap="1rem">
				<StyledImg src={mockProfileImg} $width="40%" $height="auto" />
				<CustomColumn $width="60%" $height="auto" $gap="1rem" $alignitems="flex-start" $justifycontent="center">
					<CustomFont $font="1.5rem" $color="black" $fontweight="bold">
						{profileData.name}
					</CustomFont>
					<CustomColumn $width="100%" $gap="0.5rem" $alignitems="flex-end" $justifycontent="center">
						{isEditing ? (
							<>
								<StyledInput
									type="text"
									value={editedTagline}
									placeholder="소개글을 입력해주세요"
									onChange={handleInputChange}
								/>
								<ThisCustomButton
									$disabled={!editedTagline}
									onClick={handleSaveClick}
								>
									<CustomFont $color="black" $font="0.8rem">
										저장
									</CustomFont>
								</ThisCustomButton>
							</>
						) : (
							<>
								<CustomFont $font="0.8rem" $color="black">
									{profileData.tagline || "소개글을 입력해주세요"}
								</CustomFont>
								<button
									onClick={handleEditClick}
									style={{
										backgroundColor: "transparent",
										border: "none",
										cursor: "pointer",
									}}
								>
									<IoPencilOutline style={{ fontSize: "1rem", color: "#666666" }} />
								</button>
							</>
						)}
					</CustomColumn>
				</CustomColumn>
			</CustomRow>

			<CustomColumn $width="100%" $height="auto" $alignitems="flex-end" $justifycontent="center">
				{isEditingSections ? (
					<>
						{editedSections.map((section, index) => (
							<CustomColumn key={index} $width="100%" $gap="0.5rem">
								<StyledInput
									type="text"
									value={section.content}
									placeholder="내용을 입력해주세요"
									onChange={(e) => handleSectionInputChange(index, e.target.value)}
								/>
							</CustomColumn>
						))}
						<ThisCustomButton
							$disabled={!allSectionsFilled}
							onClick={handleSectionSaveClick}
						>
							저장
						</ThisCustomButton>
					</>
				) : (
					<>
						{profileData.sections.map((section, index) => (
							<CustomColumn key={index} $width="100%" $gap="0.5rem" $justifycontent="center" $alignitems="flex-start">
								<CustomFont $font="1rem" $color="black" $fontweight="bold">
									{section.title}
								</CustomFont>
								<CustomFont $font="0.9rem" $color="#666666">
									{section.content}
								</CustomFont>
							</CustomColumn>
						))}
						<button
							onClick={handleSectionEditClick}
							style={{
								backgroundColor: "transparent",
								border: "none",
								cursor: "pointer",
							}}
						>
							<IoPencilOutline style={{ fontSize: "1rem", color: "#666666" }} />
						</button>
					</>
				)}
			</CustomColumn>

		</CustomColumn>
	);
};

export default MobileProfilePage;

const ThisCustomButton = styled(CustomButton) <{ $disabled?: boolean }>`
  background-color: ${({ $disabled }) => ($disabled ? "#D9D9D9" : "#FFD700")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  color: black;
  width: auto;
  height: auto;

  &:hover {
    background-color: ${({ $disabled }) => ($disabled ? "#D9D9D9" : "#FFC107")};
  }
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: white;
  color: black;

  &:focus {
    border-color: #ffd700;
    box-shadow: 0 0 4px rgba(255, 215, 0, 0.8);
  }

  &::placeholder {
    color: #aaa;
  }
`;
