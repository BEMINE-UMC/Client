import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultImg from '../../../../assets/images/mine/default_img.png';

import StyledImg from "../../components/StyledImg";
import CustomRow from "../../components/CustomRow";
import CustomFont from "../../components/CustomFont";
import CustomColumn from "../../components/CustomColumn";
import CustomButton from "../../components/CustomButton";

interface Section {
	title: string;
	content: string;
}

interface ProfileData {
	name: string;
	tagline: string;
	photo: string;
	sections: Section[];
}

const MobileProfile = () => {
	const accessToken = useAuthStore((state) => state.accessToken);

	const [profileData, setProfileData] = useState<ProfileData>({
		name: "",
		tagline: "",
		photo: "",
		sections: [],
	});

	const navigate = useNavigate();

	const profile = () => { navigate('/mobileprofilepage'); }
	const template = () => { navigate('/mobiletemplatepage'); }
	const content = () => { navigate('/mobilecontentpage'); }

	// 프로필 이미지 수정하기 
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
						name: response.data.success.name,
						tagline: response.data.success.introduction || "",
						photo: response.data.success.photo || defaultImg,
						sections: response.data.success.history
							? response.data.success.history.map((item: { title?: string; body?: string }) => ({
								title: item.title || "제목 없음",
								content: item.body || "내용 없음",
							}))
							: [],
					});
				}
			} catch (error) {
				console.error("프로필 데이터 조회 실패:", error);
			}
		};

		fetchProfileData();
	}, [accessToken]);

	return (
		<CustomColumn $width="90%" $height="auto" $alignitems="center" $justifycontent="center" $gap="1rem">
			<CustomButton $width='auto' $height='auto' $backgroundColor="transparent" $padding="0" onClick={profile}>
				<CustomRow $width="100%" $height="auto" $padding="1rem" $gap="1rem">
					<StyledImg src={profileData.photo} $width="40%" $height="auto" />

					<CustomColumn $width="60%" $height="auto" $gap="1rem" $alignitems="flex-start" $justifycontent="center">
						<CustomFont $font="1.5rem" $color="black" $fontweight="bold">
							{profileData.name}
						</CustomFont>

						<CustomFont $font="0.8rem" $color="black">
							{profileData.tagline || "소개글을 입력해주세요"}
						</CustomFont>
					</CustomColumn>
					<IoIosArrowForward style={{ fontSize: '3rem', color: '#D9D9D9' }} />
				</CustomRow>
			</CustomButton>

			<CustomColumn $width="100%" $height="auto" $alignitems="flex-end" $justifycontent="center">
				{profileData.sections.slice(0, 2).map((section, index) => (
					<CustomColumn key={index} $width="100%" $gap="0.5rem" $justifycontent="center" $alignitems="flex-start">
						<CustomFont $font="1rem" $color="black" $fontweight="bold">
							{section.title}
						</CustomFont>
						<CustomFont $font="0.9rem" $color="#666666">
							{section.content}
						</CustomFont>
					</CustomColumn>
				))}
			</CustomColumn>


			<CustomColumn $width="100%" $height="auto" $gap="0.5rem" $alignitems="center" $justifycontent="center">
				<CustomButton $width='100%' $height='auto' $padding="0.5rem" $backgroundColor="transparent" $border="1px solid #D9D9D9" onClick={content}>
					<CustomFont $color="black" $font="0.8rem" $fontweight="bold">게시물 작성하기</CustomFont>
				</CustomButton>
				<CustomButton $width='100%' $height='auto' $padding="0.5rem" $backgroundColor="transparent" $border="1px solid #D9D9D9" onClick={template}>
					<CustomFont $color="black" $font="0.8rem" $fontweight="bold">템플릿 올리기</CustomFont>
				</CustomButton>
			</CustomColumn>
		</CustomColumn>
	);
};

export default MobileProfile;
