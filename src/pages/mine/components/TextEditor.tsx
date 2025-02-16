import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomColumn from "./CustomColumn";
import CustomBox from "./CustomBox";

interface TextEditorProps {
	onChange?: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {
	const [content, setContent] = useState<string>("");
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const quillRef = useRef<ReactQuill | null>(null);

	// 썸네일 지정 핸들러
	const handleThumbnailSelect = (imageSrc: string) => {
		setThumbnail(imageSrc);
		document.querySelectorAll(".thumbnail-button").forEach((btn) => {
			if (!(btn instanceof HTMLButtonElement)) return; // 타입 검증 추가
			const button = btn; // 타입 단언 추가
			if (button.dataset.src === imageSrc) {
				btn.textContent = "썸네일 선택됨";
				button.style.backgroundColor = "green";
			} else {
				btn.textContent = "썸네일로 지정";
				btn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
			}
		});
	};

	// 이미지 삽입 후 썸네일 버튼 추가 -> 현재 버튼 추가되지 않는 중, 나중에 해결할 것...
	useEffect(() => {
		const quill = quillRef.current?.getEditor();
		if (!quill) return;

		quill.root.addEventListener("DOMNodeInserted", (event) => {
			const target = event.target as HTMLImageElement;
			if (target.tagName === "IMG" && !target.classList.contains("processed")) {
				target.classList.add("processed");
				target.style.position = "relative";

				const wrapper = document.createElement("div");
				wrapper.style.position = "relative";
				wrapper.style.display = "inline-block";

				const button = document.createElement("button");
				button.textContent = "썸네일로 지정";
				button.className = "thumbnail-button";
				button.dataset.src = target.src;
				button.style.position = "absolute";
				button.style.top = "5px";
				button.style.right = "5px";
				button.style.background = "rgba(0, 0, 0, 0.5)";
				button.style.color = "white";
				button.style.border = "none";
				button.style.padding = "5px";
				button.style.cursor = "pointer";
				button.onclick = () => handleThumbnailSelect(target.src);

				wrapper.appendChild(target.cloneNode(true));
				wrapper.appendChild(button);

				target.replaceWith(wrapper);
			}
			else {
				console.log('DomNodeInserted 인식 안됨 !!');
			}
		});
	}, []);

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
					style={{ width: '100%', minHeight: "30rem", border: "1px solid #ccc", padding: "10px" }}
				/>
			</CustomColumn>
		</CustomBox>
	);
};

export default TextEditor;
