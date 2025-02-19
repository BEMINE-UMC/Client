import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAuthStore } from "../../../store/authStore";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import './TextEditor.css';
import CustomColumn from "./CustomColumn";
import CustomBox from "./CustomBox";

interface TextEditorProps {
	value?: string;
	onChange?: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange, value }) => {
	const [content, setContent] = useState<string>(value || ""); // 초기값을 props로 받음

	useEffect(() => {
		setContent(value || ""); // value 변경 시 content 업데이트
	}, [value]);

	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const quillRef = useRef<ReactQuill | null>(null);
	const accessToken = useAuthStore((state) => state.accessToken);

	// 이미지 업로드 핸들러
	const handleImageUpload = async (file: File) => {

		const quill = quillRef.current?.getEditor();
		const imageCount = quill?.root.querySelectorAll('img').length || 0;

		if (imageCount >= 1) {
			alert('이미지는 최대 1장만 첨부하실 수 있습니다.');
			return; // 이미지 삽입 중단
		}

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/posts/image/uploads`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				// console.log(response);
				const imageUrl = response.data.imageUrl;
				console.log('첨부한 이미지의 url은:', imageUrl);
				console.log('토큰은:', accessToken);

				// 에디터에 이미지 삽입
				const quill = quillRef.current?.getEditor();
				const range = quill?.getSelection();
				if (quill && range) {
					quill.insertEmbed(range.index, "image", imageUrl);
					console.log('찐으로 에디터에 첨부한 이미지의 url은:', imageUrl);
				}
			} else {
				alert("이미지 업로드에 실패했습니다.");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			alert("이미지 업로드 중 오류가 발생했습니다.");
		}
	};

	const handleImageInsert = useCallback(() => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/png, image/jpeg, image/jpg, image/bmp, image/gif");
		input.click();

		input.onchange = () => {
			if (input.files) {
				const file = input.files[0];
				if (file.size > 5 * 1024 * 1024) {
					alert("이미지 크기는 5MB를 초과할 수 없습니다.");
					return;
				}
				handleImageUpload(file);
			}
		};
	}, []);

	useEffect(() => {
		if (quillRef.current) {
			const quill = quillRef.current.getEditor();
			quill.getModule("toolbar").addHandler("image", handleImageInsert);
		}
	}, [handleImageInsert]);

	return (
		<CustomBox
			$width="90%"
			$height="auto"
			$alignitems="center"
			$justifycontent="center"
			$padding="1rem"
			$backgroundcolor="white"
			$overflowy="hidden"
			$overflowx="hidden"
		>
			<CustomColumn $width="100%" $height="auto" $alignitems="flex-start" $justifycontent="flex-start">
				{/* 텍스트 입력 영역 */}
				<ReactQuill
					ref={quillRef}
					value={content}
					// 그냥 서버한테 " 랑 ' 둘 다 처리해달라고 하자.
					onChange={(value) => {
						setContent(value);
						onChange && onChange(value);
					}}
					modules={{
						toolbar: [
							["bold", "italic", "underline"],
							[{ list: "ordered" }, { list: "bullet" }],
							["link", "image"],
							["clean"],
						],
					}}
					formats={["bold", "italic", "underline", "list", "bullet", "link", "image"]}
					style={{ width: "100%", height: "8rem", minHeight: "30rem", borderBottom: "1px solid #ccc" }}
				/>
			</CustomColumn>
		</CustomBox>
	);
};

export default TextEditor;
