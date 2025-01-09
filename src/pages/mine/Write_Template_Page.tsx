// 템플릿 작성/수정 UI, 나영 작업 공간
import CustomColumn from "./components/CustomColumn";
import CustomFont from "./components/CustomFont";

const WriteTemplatePage = () => {
	return (
		<CustomColumn $width="100vw" $minHeight="100vh" $alignitems="center" $justifycontent="center" $padding="0.5rem">
			<CustomFont $color="black">여기는 템플릿 작성/수정 화면</CustomFont>
		</CustomColumn>
	);
}

export default WriteTemplatePage;