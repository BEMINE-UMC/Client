// 마이페이지 메인 UI, 나영 작업 공간
import CustomColumn from "./components/CustomColumn";
import CustomFont from "./components/CustomFont";

const MyPage = () => {
    return (
        <CustomColumn $width="100vw" $minHeight="100vh" $alignitems="center" $justifycontent="center">
            <CustomFont $color="black" $font="1rem">여기는 마이페이지</CustomFont>
        </CustomColumn>
    );
}

export default MyPage;