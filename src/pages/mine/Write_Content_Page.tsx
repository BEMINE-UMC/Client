import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

import CustomColumn from "./components/CustomColumn";
import CustomRow from "./components/CustomRow";
import StyledImg from "./components/StyledImg";
import CustomDivider from "./components/CustomDivider";
import CustomButton from "./components/CustomButton";
import CustomFont from "./components/CustomFont";
import CustomInput from "./components/CustomInput";
import Modal from "./components/Modal";
import profile from "../../assets/images/mockData/mockData_mine_ProfileImg.png";
import TextEditor from "./components/TextEditor";

const categories = [
	"콘텐츠 마케터",
	"브랜드 마케터",
	"퍼포먼스 마케터",
	"바이럴 마케터",
];

const WriteContentPage = () => {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState(categories[0]);
	const [editorContent, setEditorContent] = useState("");
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const [writeModal, setWriteModal] = useState(false);

	const accessToken = useAuthStore((state) => state.accessToken);

	const handleSubmit = async () => {
		const data = {
			title,
			body: editorContent,
			categoryId: categories.indexOf(category) + 1,
			thumbnail,
		};

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/posts/write`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 201) {
				alert("게시글이 성공적으로 작성되었습니다.");
				setWriteModal(false);
			}
		} catch (error) {
			console.log(accessToken);
			console.error("Error submitting post:", error);
			alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const isContentEmpty = !editorContent.trim();
	const isTitleEmpty = title.trim() === "";
	const isButtonDisabled = isContentEmpty || isTitleEmpty;

	return (
		<CustomColumn
			$width="100vw"
			$minHeight="100vh"
			$alignitems="center"
			$justifycontent="flex-start"
			$padding="0.5rem"
			$gap="3rem"
		>
			<CustomColumn $height="2vh"></CustomColumn>
			<CustomRow
				$width="90%"
				$height="auto"
				$gap="4rem"
				$alignitems="flex-start"
				$justifycontent="center"
			>
				<StyledImg src={profile} $borderradius="0.5rem" $width="15%" />

				<CustomColumn
					$width="25%"
					$height="auto"
					$gap="3rem"
					$alignitems="flex-start"
					$justifycontent="center"
				>
					<CustomInput
						placeholder="제목을 입력하세요"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<CustomColumn
						$width="100%"
						$height="auto"
						$gap="1rem"
						$alignitems="flex-start"
						$justifycontent="center"
					>
						<CustomFont $color="black">{new Date().toLocaleDateString()}</CustomFont>
						<CustomDivider $width="100%" $height="1px" $backgroundcolor="#C9C9C9" />
						<CustomFont $color="black">유궁둔</CustomFont>
					</CustomColumn>
				</CustomColumn>

				<CustomColumn
					$width="50%"
					$height="auto"
					$gap="0.5rem"
					$alignitems="flex-start"
					$justifycontent="center"
				>
					{categories.map((cat, index) => (
						<label key={index}>
							<input
								type="radio"
								name="category"
								value={cat}
								checked={category === cat}
								onChange={() => setCategory(cat)}
							/>
							<CustomFont $color="black" $fontweight="bold">{cat}</CustomFont>
						</label>
					))}
				</CustomColumn>
			</CustomRow>

			<CustomColumn
				$width="90%"
				$alignitems="flex-start"
				$justifycontent="center"
				$gap="0.5rem"
			>
				<CustomFont $color="#666666" $fontweight="bold" $font="1rem">
					카테고리 선택
				</CustomFont>
			</CustomColumn>

			<TextEditor onChange={setEditorContent} />

			<CustomRow $width="90%" $justifycontent="flex-end">
				<CustomButton
					$width="5rem"
					$height="auto"
					$padding="0.5rem"
					$backgroundColor={isButtonDisabled ? "#D9D9D9" : "#FFE100"}
					disabled={isButtonDisabled}
					onClick={() => setWriteModal(true)}
				>
					<CustomFont $color="black" $fontweight="bold">게시</CustomFont>
				</CustomButton>
			</CustomRow>

			<Modal isOpen={writeModal} onClose={() => setWriteModal(false)}>
				<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
					<CustomFont $color="black" $fontweight="bold">게시하시겠습니까?</CustomFont>
					<CustomRow $width="90%">
						<CustomButton $backgroundColor="transparent" onClick={() => setWriteModal(false)}>
							<CustomFont $color="black" $fontweight="bold">취소</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="#FFE100" onClick={handleSubmit}>
							<CustomFont $color="black" $fontweight="bold">게시하기</CustomFont>
						</CustomButton>
					</CustomRow>
				</CustomColumn>
			</Modal>
		</CustomColumn>
	);
};

export default WriteContentPage;
