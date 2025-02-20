import { useState } from 'react';
import styled from "styled-components";
import CustomColumn from "../../components/CustomColumn";
import CustomButton from "../../components/CustomButton";
import CustomFont from "../../components/CustomFont";
import CustomDivider from "../../components/CustomDivider";
import CustomRow from "../../components/CustomRow";

import TextEditor from "../../components/TextEditor";
import { useAuthStore } from '../../../../store/authStore';
import axios from 'axios';

const categories = [
	"콘텐츠 마케터",
	"브랜드 마케터",
	"퍼포먼스 마케터",
	"바이럴 마케터",
];

const MobileContentPage = () => {

	const getCurrentDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const day = String(today.getDate()).padStart(2, "0");
		return `${year}.${month}.${day}`;
	};

	const [data, setData] = useState<{ title: string; body: string }>({
		title: "",
		body: "",
	});

	const [editorContent, setEditorContent] = useState("");
	const accessToken = useAuthStore((state) => state.accessToken);
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState(categories[0]);
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const [writeModal, setWriteModal] = useState(false);

	const handleSubmit = async () => {
		const data2 = {
			// title: title,
			title: data.title,
			body: editorContent,
			categoryId: categories.indexOf(category) + 1,
			thumbnail,
		};

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/posts/write`,
				data2,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 201) {
				console.log('전송한 data는:', data2);
				alert("게시글이 성공적으로 작성되었습니다.");
				setWriteModal(false);
			}
		} catch (error) {
			console.log('body에 담긴 내용은:', editorContent);
			// console.log(accessToken);
			console.error("Error submitting post:", error);
			alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
		}
	};

	return (
		<CustomColumn $width="90%" $minHeight="100vh" $alignitems="center" $justifycontent="center">
			<CustomColumn $height="1rem" />
			<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-end" $gap="1rem">
				<CustomButton $width="auto" $height="auto" $padding="0.5rem" $backgroundColor="#FFE100" onClick={handleSubmit}>
					<CustomFont $color="black">게시/수정하기</CustomFont>
				</CustomButton>
				<CustomButton $width="auto" $height="auto" $padding="0.5rem" $backgroundColor="#FFE100">
					<CustomFont $color="black">삭제하기</CustomFont>
				</CustomButton>
			</CustomRow>

			<StyledInput placeholder="제목을 입력하세요"
				onChange={(e) => {
					setData((prev) => ({ ...prev, title: e.target.value }));
					setTitle(e.target.value);
				}} />

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
						<CustomFont $color="black">콘텐츠 마케터</CustomFont>
					</label>
					<label>
						<input type="radio" name="visibility" value="readable" />
						<CustomFont $color="black">바이럴 마케터</CustomFont>
					</label>
					<label>
						<input type="radio" name="visibility" value="readable" />
						<CustomFont $color="black">브랜드 마케터</CustomFont>
					</label>
				</CustomRow>
				<CustomRow $width="100%" $alignitems="center" $justifycontent="flex-start" $gap="1rem">
					<label>
						<input type="radio" name="visibility" value="private" />
						<CustomFont $color="black">퍼포먼스 마케터</CustomFont>
					</label>
					<label>
						<input type="radio" name="visibility" value="private" />
						<CustomFont $color="black">기타</CustomFont>
					</label>
				</CustomRow>
			</CustomColumn>

			<TextEditor onChange={setEditorContent} />
			<CustomColumn $height="3rem" />
		</CustomColumn>
	);
};

export default MobileContentPage;

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
