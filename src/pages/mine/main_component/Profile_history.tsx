import { useState, useEffect } from 'react';
import axios from "axios";
import { useAuthStore } from "../../../store/authStore";

import CustomColumn from "../components/CustomColumn";
import CustomInput from "../components/CustomInput";
import CustomFont from '../components/CustomFont';
import CustomButton from '../components/CustomButton';
import CustomRow from '../components/CustomRow';

const HistoryForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [history, setHistory] = useState<{ id: number; title: string; body: string }[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false); // 연혁 추가 폼 상태
	const accessToken = useAuthStore((state) => state.accessToken);
	const [isEditing, setIsEditing] = useState(false); // 연혁 수정 모드
	const [editedHistory, setEditedHistory] = useState<{ id: number; title: string; body: string }[]>([]);


	const toggleEditMode = () => {
		if (!isEditing) {
			setEditedHistory(history.map(({ id, title, body }) => ({ id, title, body })));
		}
		setIsEditing(!isEditing);
	};


	const handleInputChange = (index: number, field: "title" | "body", value: string) => {
		const updatedHistory = [...editedHistory];
		updatedHistory[index][field] = value; // 입력된 값 업데이트
		setEditedHistory(updatedHistory);
	};

	const updateHistory = async () => {
		try {
			const payload = {
				// introduction: "멋진 콘텐츠 마케터가 되고싶은", // 상태로 변경해야함 
				histories: editedHistory, // 사용자가 수정한 연혁 전체 전송
			};

			const response = await axios.patch(
				`${import.meta.env.VITE_API_BASE_URL}/myPage/history`,
				payload,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200 && response.data.success) {
				alert("연혁이 성공적으로 수정되었습니다!");
				setHistory([...editedHistory]); // 수정된 연혁 화면에 업데이트
				setIsEditing(false);
			}
		} catch (error) {
			console.error("연혁 수정 실패:", error);
			alert("연혁 수정에 실패했습니다.");
		}
	};



	// 마이페이지 API 요청 함수 (연혁 조회를 위함)
	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/myPage`, {
					headers: {
						"Accept": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (response.status === 200 && response.data.success) {
					setHistory(response.data.success.history || []);
				}
			} catch (error) {
				console.error("연혁 데이터 조회 실패:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchHistory();
	}, [accessToken]);

	// 연혁 추가 버튼 상태 관리 용도
	const isButtonDisabled = title.trim() === "" || content.trim() === "";

	// 연혁 추가 API 요청 함수 
	const addHistory = async (title: string, body: string) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/myPage/history/create`,
				{ title, body },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200 && response.data.success) {
				alert("연혁을 추가하였습니다!");
				setHistory((prev) => [...prev, response.data.success]);
				setTitle("");
				setContent("");
				setShowForm(false); // 연혁 추가 후 폼 자동 닫기
			}
		} catch (error) {
			console.error("연혁 추가 실패:", error);
		}
	};

	return (
		<CustomColumn $width="100%" $alignitems="center" $gap="1rem" $justifycontent="center">
			{/* 연혁 데이터 렌더링 */}
			{loading ? (
				<CustomFont $color="gray">불러오는 중...</CustomFont>
			) : history.length > 0 ? (
				history.map((entry, index) => (
					<CustomColumn key={index} $width="100%" $alignitems="flex-start" $gap="0.5rem">
						{isEditing ? (
							<>
								<CustomInput
									value={editedHistory[index]?.title || ""}
									onChange={(e) => handleInputChange(index, "title", e.target.value)}
								/>
								<CustomInput
									value={editedHistory[index]?.body || ""}
									onChange={(e) => handleInputChange(index, "body", e.target.value)}
								/>
							</>
						) : (
							<>
								<CustomFont $color="#686868" $font="0.8rem" $fontweight="bold">
									{entry.title}
								</CustomFont>
								<CustomFont $color="#686868" $font="0.8rem">
									{entry.body}
								</CustomFont>
							</>
						)}
					</CustomColumn>
				))
			) : (
				<CustomColumn $width="100%" $alignitems="center">
					<CustomFont $color="gray">아직 연혁이 없어요!</CustomFont>
				</CustomColumn>
			)}

			{/* 연혁 수정 버튼 및 저장 버튼 */}
			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end">
				<CustomButton
					onClick={toggleEditMode}
					$backgroundColor="#FFE100"
					$padding="0.5rem"
					$width="auto"
					$height="auto"
				>
					<CustomFont $color="black" $fontweight="bold">
						{isEditing ? "연혁 수정 취소" : "연혁 수정하기"}
					</CustomFont>
				</CustomButton>

				{isEditing && (
					<CustomButton
						onClick={updateHistory}
						$backgroundColor="#FFE100"
						$padding="0.5rem"
						$width="auto"
						$height="auto"
					>
						<CustomFont $color="black" $fontweight="bold">저장하기</CustomFont>
					</CustomButton>
				)}

				{/* 연혁 추가 버튼 */}
				<CustomButton
					onClick={() => setShowForm(!showForm)}
					$backgroundColor="#FFE100"
					$padding="0.5rem"
					$width="auto"
					$height="auto"
				>
					<CustomFont $color="black" $fontweight="bold">
						{showForm ? "추가 취소" : "연혁 생성하기"}
					</CustomFont>
				</CustomButton>
			</CustomRow>

			{/* 연혁 추가 폼 */}
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
						onClick={() => addHistory(title, content)}
						disabled={title.trim() === "" || content.trim() === ""}
						$backgroundColor={title.trim() === "" || content.trim() === "" ? "#D9D9D9" : "#FFE100"}
						$padding="0.5rem"
						$width="auto"
						$height="auto"
					>
						<CustomFont $color="black" $fontweight="bold">연혁 추가하기</CustomFont>
					</CustomButton>
				</CustomColumn>
			)}
		</CustomColumn>
	);

};

export default HistoryForm;
