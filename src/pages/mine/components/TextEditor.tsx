import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";

interface TextEditorProps {
	editorState: EditorState | null;
	onEditorStateChange: (editorState: EditorState) => void;
}

const TextEditor = ({ editorState, onEditorStateChange }: TextEditorProps) => {
	const safeEditorState = editorState || EditorState.createEmpty();

	const handleEditorChange = (newEditorState: EditorState) => {
		onEditorStateChange(newEditorState);
	};

	return (
		<Editor
			editorState={safeEditorState}
			onEditorStateChange={handleEditorChange}
			toolbarClassName="toolbarClassName"
			wrapperClassName="wrapperClassName"
			editorClassName="editorClassName"
		/>
	);
};

export default TextEditor;
