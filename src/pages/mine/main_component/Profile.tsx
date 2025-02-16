import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import CustomInput from "../components/CustomInput";

import CustomColumn from "../components/CustomColumn";
import CustomRow from "../components/CustomRow";
import CustomFont from "../components/CustomFont";
import StyledImg from "../components/StyledImg";
import CustomButton from "../components/CustomButton";
import CustomDivider from "../components/CustomDivider";
import HistoryForm from './Profile_history';
import defaultImg from '../../../assets/images/mine/default_img.png';

// 스타일 코드 하단으로 내림 

const Profile = () => {
	const navigate = useNavigate();
	const accessToken = useAuthStore((state) => state.accessToken);
	const [isEditing, setIsEditing] = useState(false);
	const [introduction, setIntroduction] = useState(""); // 한줄소개 값 상태

	// 프로필 데이터 전체 상태로 관리
	const [profileData, setProfileData] = useState<{ name: string; introduction: string; photo: string; history: { id: number; title: string; body: string }[] }>({
		name: "",
		introduction: "",
		photo: "",
		history: []
	});

	const GoWriteContent = () => {
		navigate('/writecontentpage');
	}

	const GoWriteTemplate = () => {
		navigate('/writetemplatepage');
	}

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
				}
			} catch (error) {
				console.error("마이페이지 정보 조회 실패:", error);
				console.log(accessToken);
			}
		};
		fetchProfileData();
	}, [accessToken]);

	// 프로필 사진 추가/변경 API 요청 함수 
	const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const formData = new FormData();
			formData.append("photo", file);

			try {
				const response = await axios.patch(
					`${import.meta.env.VITE_API_BASE_URL}/profile/modify`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				if (response.status === 200 && response.data.success) {
					console.log("성공!");
					console.log(response.data.success.photo)
					setProfileData((prev) => ({ ...prev, photo: response.data.success.photo }));
				}
			} catch (error) {
				console.error("프로필 이미지 업로드 실패:", error);
			}
		}
	};

	// 한줄소개 추가/수정 API 요청
	const updateIntroduction = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/myPage/history/create`,
				{ introduction },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200 && response.data.success) {
				alert("한줄소개가 추가/수정되었습니다!");
				setProfileData((prev) => ({
					...prev,
					introduction, // 한줄소개 업데이트 즉시 반영
				}));
				setIsEditing(false); // 수정 완료 후 input 필드 닫음
			}
		} catch (error) {
			console.error("한줄소개 추가/수정 실패:", error);
		}
	};



	return (
		<ResponsiveColumn>
			<ResponsiveInnerColumn>
				<StyledImg src={profileData.photo || "default-profile.png"} style={{ maxWidth: '100%', minWidth: '80%' }} $borderradius="0.5rem" />
				<CustomRow $width="100%" $justifycontent="flex-end">
					<CustomButton as="label" $backgroundColor="black" $padding="0.5rem" $width="auto" $height="auto">
						<CustomFont $color="white">수정하기</CustomFont>
						<input type="file" onChange={handleImageUpload} style={{ display: "none" }} />
					</CustomButton>
				</CustomRow>
				<CustomFont $color="black" $font="2rem" $fontweight="bold">{profileData.name}</CustomFont>
				{/* <CustomFont $color="black" $font="1rem" $fontweight="bold">{profileData.introduction}</CustomFont> */}
				{/* 한줄소개 표시 부분 */}
				<CustomRow $width='100%' $alignitems='center' $justifycontent='flex-end'>
					{isEditing ? (
						<>
							<CustomInput
								placeholder="한줄소개를 입력하세요"
								value={introduction}
								onChange={(e) => setIntroduction(e.target.value)}
							/>
							<CustomButton
								onClick={updateIntroduction}
								$backgroundColor="#FFE100"
								$padding="0.5rem"
								$width="auto"
								$height="auto"
							>
								<CustomFont $color="black" $fontweight='bold'>확인</CustomFont>
							</CustomButton>
						</>
					) : (
						<CustomRow $width="100%" $alignitems="center" $justifycontent="space-between">
							<CustomFont
								$color={profileData.introduction ? "black" : "#D9D9D9"}
								$font="1rem"
								$fontweight="bold"
							>
								{profileData.introduction || "아직 등록한 한줄소개가 없어요."}
							</CustomFont>
							<CustomButton
								onClick={() => setIsEditing(true)}
								$backgroundColor="#FFE100"
								$padding="0.5rem"
								$width="auto"
								$height="auto"
							>
								<CustomFont $color="black" $fontweight='bold'>한줄소개 추가/수정하기</CustomFont>
							</CustomButton>
						</CustomRow>
					)}
				</CustomRow>

			</ResponsiveInnerColumn>

			<ResponsiveInnerColumn>
				{/* 연혁 관련 컴포넌트를 분리했음 */}
				<HistoryForm />
			</ResponsiveInnerColumn>

			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />
			<CustomRow $width="80%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton $backgroundColor="#FFE100" $padding="0.5rem" $width="7rem" $height="auto" onClick={GoWriteContent}>
					<CustomFont $color="black" $fontweight='bold'>게시물 작성</CustomFont>
				</CustomButton>
				<CustomButton $backgroundColor="#FFE100" $padding="0.5rem" $width="7rem" $height="auto" onClick={GoWriteTemplate}>
					<CustomFont $color="black" $fontweight='bold'>템플릿 등록</CustomFont>
				</CustomButton>
			</CustomRow>
		</ResponsiveColumn>
	);
};

export default Profile;

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
  width: 80%;
  height: auto;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 90%;
    gap: 0.4rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.3rem;
  }
`;
