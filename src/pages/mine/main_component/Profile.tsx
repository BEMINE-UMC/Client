import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../../store/authStore";
import CustomColumn from "../components/CustomColumn";
import CustomRow from "../components/CustomRow";
import CustomFont from "../components/CustomFont";
import StyledImg from "../components/StyledImg";
import CustomButton from "../components/CustomButton";
import styled from "styled-components";
import defaultImg from '../../../assets/images/mine/default_img.png';
import CustomDivider from "../components/CustomDivider";

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

const Profile = () => {
	const navigate = useNavigate();
	const accessToken = useAuthStore((state) => state.accessToken);
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
					// setProfileData(response.data.success);
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

	return (
		<ResponsiveColumn>
			<ResponsiveInnerColumn>
				<StyledImg src={profileData.photo || "default-profile.png"} style={{ maxWidth: '100%', minWidth: '80%' }} />
				<CustomRow $width="100%" $justifycontent="flex-end">
					<CustomButton as="label" $backgroundColor="black" $padding="0.5rem" $width="auto" $height="auto">
						<CustomFont $color="white" $fontweight="bold">수정하기</CustomFont>
						<input type="file" onChange={handleImageUpload} style={{ display: "none" }} />
					</CustomButton>
				</CustomRow>
				<CustomFont $color="black" $font="2rem" $fontweight="bold">{profileData.name}</CustomFont>
				<CustomFont $color="black" $font="1rem" $fontweight="bold">{profileData.introduction}</CustomFont>
			</ResponsiveInnerColumn>

			<ResponsiveInnerColumn>
				{profileData.history.length > 0 ? (
					profileData.history.map((entry, index) => (
						<CustomColumn key={index} $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
							<CustomFont $color="#686868" $font="0.8rem" $fontweight="bold">{entry.title}</CustomFont>
							<CustomFont $color="#686868" $font="0.8rem">{entry.body}</CustomFont>
						</CustomColumn>
					))
				) : (
					<CustomColumn $width="100%" $minHeight="20rem" $alignitems="center" $justifycontent="center">
						<CustomFont $color='gray' $font='1rem'>아직 연혁을 작성하지 않으셨어요!</CustomFont>
						<CustomButton $backgroundColor="black" $padding="0.5rem" $width='auto' $height='auto'>
							<CustomFont $color="white" $fontweight="bold">연혁 생성하기</CustomFont>
						</CustomButton>
					</CustomColumn>
				)}
			</ResponsiveInnerColumn>

			<CustomDivider $width="100%" $height="1px" $backgroundcolor="#D9D9D9" />
			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton $backgroundColor="black" $padding="0.5rem" $width="7rem" $height="auto" onClick={GoWriteContent}>
					<CustomFont $color="white" $font="0.7rem">게시물 작성</CustomFont>
				</CustomButton>
				<CustomButton $backgroundColor="black" $padding="0.5rem" $width="7rem" $height="auto" onClick={GoWriteTemplate}>
					<CustomFont $color="white" $font="0.7rem">템플릿 등록</CustomFont>
				</CustomButton>
			</CustomRow>
		</ResponsiveColumn>
	);
};

export default Profile;
