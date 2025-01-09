// 마이페이지 메인 UI, 나영 작업 공간
import CustomRow from "./components/CustomRow";
import CustomDivider from "./components/CustomDivider";

import Profile from "./main_component/Profile";
import Likes from "./main_component/Likes";
import Workspace from "./main_component/Workspace";

const MyPage = () => {
    return (
        <CustomRow $width="100vw" $height="auto" $alignitems="center" $justifycontent="center" $padding="0.5rem">
            <Profile />
            <Likes />
            <CustomDivider $width="0.5px" $height="90vh" $backgroundcolor="#D9D9D9" />
            <Workspace />
        </CustomRow>
    );
}

export default MyPage;