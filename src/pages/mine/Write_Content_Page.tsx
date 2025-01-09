// 게시믈 작성 UI, 나영 작업 공간
import CustomColumn from "./components/CustomColumn";
import CustomFont from "./components/CustomFont";

const WriteContentPage = () => {
	return (
		<CustomColumn $width="100vw" $minHeight="100vh" $alignitems="center" $justifycontent="center" $padding="0.5rem">
			<CustomFont $color="black">여기는 게시물 작성 화면</CustomFont>
		</CustomColumn>
	);
}

export default WriteContentPage;