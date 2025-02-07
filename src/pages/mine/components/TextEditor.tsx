import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";

interface TextEditorProps {
	editorState: EditorState | null;
	onEditorStateChange: (editorState: EditorState) => void;
	onThumbnailSelect: (imageSrc: string) => void;
}

const TextEditor = ({ editorState, onEditorStateChange, onThumbnailSelect }: TextEditorProps) => {
	const safeEditorState = editorState || EditorState.createEmpty();

	const handleEditorChange = (newEditorState: EditorState) => {
		onEditorStateChange(newEditorState);
	};

	const handleImageClick = (imageSrc: string) => {
		if (window.confirm("이 이미지를 대표 이미지로 설정하시겠습니까?")) {
			onThumbnailSelect(imageSrc);
		}
	};

	const renderContentWithThumbnailButton = () => {
		const rawContent = convertToRaw(safeEditorState.getCurrentContent());
		const htmlContent = draftToHtml(rawContent);

		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlContent, "text/html");
		const images = doc.querySelectorAll("img");

		images.forEach((image) => {
			const button = document.createElement("button");
			button.textContent = "대표 이미지로 선택";
			button.style.marginLeft = "10px";
			button.onclick = () => handleImageClick(image.src);
			image.insertAdjacentElement("afterend", button);
		});

		return { __html: doc.body.innerHTML };
	};

	return (
		<div>
			<Editor
				editorState={safeEditorState}
				onEditorStateChange={handleEditorChange}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
			/>
			<div
				className="preview"
				dangerouslySetInnerHTML={renderContentWithThumbnailButton()}
			></div>
		</div>
	);
};

export default TextEditor;