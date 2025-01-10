// 게시글 작성 UI, 나영 담당

import { useState } from "react";
import CustomColumn from "./components/CustomColumn";
import CustomRow from "./components/CustomRow";
import StyledImg from "./components/StyledImg";
import CustomDivider from "./components/CustomDivider";
import CustomButton from "./components/CustomButton";
import CustomFont from "./components/CustomFont";
import CustomInput from "./components/CustomInput";
import Modal from "./components/Modal";

import profile from '../../assets/images/mockData/mockData_mine_ProfileImg.png';
import TextEditor from "./components/TextEditor";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { useNavigate } from "react-router-dom";

const categories = [
	"콘텐츠 마케터",
	"브랜드 마케터",
	"퍼포먼스 마케터",
	"바이럴 마케터"
];

const profileSections = [
	{ title: "1. 학력 및 전공", content: "학력 데이터 전공 데이터~~" },
	{ title: "2. 주요 경험", content: "인턴 공모전 데이터데이터..." },
	{ title: "3. 기타 활동", content: "대외활동 ~~~" },
	{ title: "4. 주요 역량 및 성과", content: "수상수상 수상해" }
];

const WriteContentPage = () => {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState(categories[0]);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [writeModal, setWriteModal] = useState(false);
	// const navigate = useNavigate();

	const handleEditorChange = (newEditorState: EditorState) => {
		setEditorState(newEditorState);
	};

	const isContentEmpty = !editorState.getCurrentContent().hasText();
	const isTitleEmpty = title.trim() === "";
	const isButtonDisabled = isContentEmpty || isTitleEmpty;

	const handleSubmit = () => {
		setWriteModal(true);
	};

	const Back = () => {
		setWriteModal(false);
	};

	return (
		<CustomColumn $width="100vw" $minHeight="100vh" $alignitems="center" $justifycontent="flex-start" $padding="0.5rem" $gap="3rem">
			<CustomColumn $height="2vh"></CustomColumn>
			<CustomRow $width="90%" $height="auto" $gap="4rem" $alignitems="flex-start" $justifycontent="center">
				<StyledImg src={profile} $borderradius="0.5rem" $width="15%" />

				<CustomColumn $width="25%" $height="auto" $gap="3rem" $alignitems="flex-start" $justifycontent="center">
					<CustomInput placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />

					<CustomColumn $width="100%" $height="auto" $gap="1rem" $alignitems="flex-start" $justifycontent="center">
						<CustomFont $color="black">{new Date().toLocaleDateString()}</CustomFont>
						<CustomDivider $width="100%" $height="1px" $backgroundcolor="#C9C9C9" />
						<CustomFont $color="black">유궁둔</CustomFont>
					</CustomColumn>
				</CustomColumn>

				<CustomColumn $width="50%" $height="auto" $gap="0.5rem" $alignitems="flex-start" $justifycontent="center">
					{profileSections.map((section, index) => (
						<>
							<CustomFont key={`title-${index}`} $color="#707070" $fontweight="bold">{section.title}</CustomFont>
							<CustomFont key={`content-${index}`} $color="#707070">{section.content}</CustomFont>
						</>
					))}
				</CustomColumn>
			</CustomRow>

			<CustomColumn $width="90%" $alignitems="flex-start" $justifycontent="center" $gap="0.5rem">
				<CustomFont $color="#666666" $fontweight="bold" $font="1rem">카테고리 선택</CustomFont>
				<CustomRow $width="100%" $justifycontent="flex-start">
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
				</CustomRow>
			</CustomColumn>

			<TextEditor editorState={editorState} onEditorStateChange={handleEditorChange} />

			<CustomRow $width="90%" $justifycontent="flex-end">
				<CustomButton
					$width='5rem'
					$height='auto'
					$padding="0.5rem"
					$backgroundColor={isButtonDisabled ? "#D9D9D9" : "#FFE100"}
					disabled={isButtonDisabled}
					onClick={handleSubmit}
				>
					<CustomFont $color="black" $fontweight="bold">게시</CustomFont>
				</CustomButton>
			</CustomRow>

			<Modal isOpen={writeModal} onClose={() => setWriteModal(false)}>
				<CustomColumn $width="90%" $alignitems="center" $justifycontent="center">
					<CustomFont $color='black' $fontweight='bold'>게시하시겠습니까?</CustomFont>
					<CustomRow $width="90%">
						<CustomButton $backgroundColor="transparent" onClick={Back}>
							<CustomFont $color='black' $fontweight='bold'>취소</CustomFont>
						</CustomButton>
						<CustomButton $backgroundColor="#FFE100">
							<CustomFont $color='black' $fontweight='bold'>게시하기</CustomFont>
						</CustomButton>
					</CustomRow>
				</CustomColumn>
			</Modal>
		</CustomColumn>
	);
}

export default WriteContentPage;
