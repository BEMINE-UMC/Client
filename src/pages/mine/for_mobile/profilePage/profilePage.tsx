import styled from "styled-components";
import { useAuthStore } from "../../../../store/authStore";
import axios from "axios";
import { useEffect, useState } from "react";

import defaultImg from '../../../../assets/images/mine/default_img.png';
import CustomColumn from "../../components/CustomColumn";
import CustomRow from "../../components/CustomRow";
import CustomFont from "../../components/CustomFont";
import StyledImg from "../../components/StyledImg";
import { IoPencilOutline } from "react-icons/io5";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

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

const MobileProfilePage = () => {
	// const [profileData, setProfileData] = useState(initialProfileData);
	const accessToken = useAuthStore((state) => state.accessToken);

	const [profileData, setProfileData] = useState<ProfileData>({
		name: "",
		tagline: "",
		photo: "",
		sections: [],
	});

	const [isEditing, setIsEditing] = useState(false);
	const [editedTagline, setEditedTagline] = useState(profileData.tagline);
	const [showForm, setShowForm] = useState(false); // 연혁 추가 폼 상태
	const [title, setTitle] = useState(""); // 연혁 제목
	const [content, setContent] = useState(""); // 연혁 내용
	const [history, setHistory] = useState<Section[]>(profileData.sections); // 기존 연혁 데이터

	// 연혁 추가 버튼 상태 관리
	const isButtonDisabled = title.trim() === "" || content.trim() === "";

	// 연혁 추가 API 요청 함수
	const addHistory = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/myPage/history/create`,
				{ title, body: content },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200 && response.data.success) {
				alert("연혁을 추가하였습니다!");

				// 기존 history에 새로운 데이터 추가
				setHistory((prev) => [...prev, { title, content }]);
				setProfileData((prev) => ({
					...prev,
					sections: [...prev.sections, { title, content }],
				}));

				// 입력 필드 초기화 및 폼 닫기
				setTitle("");
				setContent("");
				setShowForm(false);
			}
		} catch (error) {
			console.error("연혁 추가 실패:", error);
		}
	};

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
				{ editedTagline },
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
					editedTagline, // 한줄소개 업데이트 즉시 반영
				}));
				setIsEditing(false); // 수정 완료 후 input 필드 닫음
			}
		} catch (error) {
			console.error("한줄소개 추가/수정 실패:", error);
		}
	};

	useEffect(() => {
		setHistory(profileData.sections);
	}, [profileData.sections]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedTagline(e.target.value);
	};

	return (
		<CustomColumn $width="90%" $minHeight="100vh" $alignitems="center" $justifycontent="center">
			{/* 상단 프로필 정보 */}
			<CustomRow $width="100%" $height="auto" $padding="1rem" $gap="1rem">
				<CustomColumn $width="40%" $alignitems="center" $justifycontent="center" $gap="0.2rem">
					<StyledImg src={profileData.photo} $width="100%" $height="auto" />

					<CustomButton as="label" $backgroundColor="black" $padding="0.5rem" $width="100%" $height="auto">
						<CustomFont $color="white">수정하기</CustomFont>
						<input type="file" onChange={handleImageUpload} style={{ display: "none" }} />
					</CustomButton>
				</CustomColumn>

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
									onClick={updateIntroduction}
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
				{history.length > 0 ? (
					history.map((section, index) => (
						<CustomColumn key={index} $width="100%" $gap="0.5rem" $justifycontent="center" $alignitems="flex-start">
							<CustomFont $font="1rem" $color="black" $fontweight="bold">
								{section.title}
							</CustomFont>
							<CustomFont $font="0.9rem" $color="#666666">
								{section.content}
							</CustomFont>
						</CustomColumn>
					))
				) : (
					<CustomFont $color="gray">아직 연혁이 없어요!</CustomFont>
				)}

				<CustomButton onClick={() => setShowForm(!showForm)} $width="auto" $height="auto" $padding="0.5rem" $backgroundColor="black">
					<CustomFont $color="white">{showForm ? "추가 취소" : "연혁 추가"}</CustomFont>
				</CustomButton>

				{showForm && (
					<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center" $gap="1rem">
						<CustomInput
							placeholder="제목을 입력하세요"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<CustomInput
							placeholder="내용을 입력하세요"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<CustomButton
							onClick={addHistory}
							disabled={isButtonDisabled}
							$backgroundColor={isButtonDisabled ? "#D9D9D9" : "#FFE100"}
							$padding="0.5rem"
							$width="auto"
							$height="auto"
						>
							<CustomFont $color="black" $fontweight="bold">연혁 추가하기</CustomFont>
						</CustomButton>
					</CustomColumn>
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
