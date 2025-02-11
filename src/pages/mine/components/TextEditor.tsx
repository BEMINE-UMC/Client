import { useState, useRef } from "react";
import CustomColumn from "./CustomColumn";
import CustomRow from "./CustomRow";
import CustomFont from "./CustomFont";
import CustomBox from "./CustomBox";

interface TextEditorProps {
	onChange?: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {
	const [content, setContent] = useState<string>("");
	const editorRef = useRef<HTMLDivElement | null>(null);

	// 텍스트 변경 핸들러
	const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
		const newContent = e.currentTarget.innerHTML;
		setContent(newContent);
		onChange && onChange(newContent);
	};

	// 이미지 삽입 핸들러
	const handleImageInsert = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					const imgTag = `<img src='${reader.result}' alt='uploaded-image' />`;
					setContent((prev) => prev + imgTag);
					onChange && onChange(content + imgTag);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<CustomBox $width="90%" $height='auto' $alignitems="center" $justifycontent="center" $border="1px solid #666666" $padding="1rem" $backgroundcolor="white" $overflowy="hidden">
			<CustomColumn $width="100%" $height="30rem" $alignitems="flex-start" $justifycontent="flex-start">
				{/* 이미지 업로드 버튼 */}
				<input
					width='100%'
					type="file"
					accept="image/*"
					onChange={handleImageInsert}
					style={{ marginBottom: "10px" }}
				/>

				{/* 텍스트 입력 영역 */}
				<div
					ref={editorRef}
					contentEditable
					onInput={handleInputChange}
					style={{
						border: "1px solid #ccc",
						height: "30rem",
						padding: "10px",
						width: "95%",
						alignItems: "center",
						justifyContent: "center"
					}}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</CustomColumn>
		</CustomBox>
	);
};

export default TextEditor;
