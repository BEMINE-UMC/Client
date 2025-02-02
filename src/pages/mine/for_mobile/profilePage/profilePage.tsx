import CustomColumn from "../../components/CustomColumn";
import CustomRow from "../../components/CustomRow";
import CustomFont from "../../components/CustomFont";
import StyledImg from "../../components/StyledImg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { IoPencilOutline } from "react-icons/io5";
import mockProfileImg from '../../../../../assets/images/mockData/mockData_mine_ProfileImg.png';

// 마이페이지 > 모바일 view > 프로필 클릭 시 나오는 연혁 수정 화면

const profilePage = () => {

	return (
		<CustomColumn $width="100vw" $height="auto" $alignitems="center" $justifycontent="center">
			<CustomRow $width="90%" $alignitems="center" $justifycontent="center">
				<StyledImg src={mockProfileImg} $width="40%" $height="40%" />
			</CustomRow>
		</CustomColumn>
	);
};

export default profilePage;
