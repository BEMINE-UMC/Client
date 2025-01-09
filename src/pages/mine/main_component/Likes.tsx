import { useNavigate } from "react-router-dom";
import CustomColumn from "../components/CustomColumn";
import CustomFont from "../components/CustomFont";
import CustomBox from "../components/CustomBox";
import StyledImg from "../components/StyledImg";
import CustomButton from "../components/CustomButton";

// 마이페이지의 좋아요 누른 컴포넌트, 나영 담당

import mockDataLikes1 from '../../../assets/images/mockData/mockData_mine_Likes_1.png';
import mockDataLikes2 from '../../../assets/images/mockData/mockData_mine_Likes_2.png';

const mockDataLikes = [mockDataLikes1, mockDataLikes2];

const Likes = () => {
	const navigate = useNavigate();
	const GoLikesTemplate = () => { navigate('/my'); } // 실제 경로로 나중에 바꾸기 - 좋아요 누른 게시물 버튼

	return (
		<CustomColumn $width="25%" $minHeight="100vh" $alignitems="center" $justifycontent="flex-start">
			<CustomColumn $height="1vh"></CustomColumn>
			<CustomFont $color="black" $font="0.9rem" $fontweight="bold">좋아요 누른 템플릿</CustomFont>

			<CustomBox $flexdirection="column" $width="80%" $height="auto" $padding="0.5rem" $backgroundcolor="transparent" $border="1.5px solid #D9D9D9"
				$alignitems="center" $justifycontent="center" $borderradius="1rem">
				{mockDataLikes.map((src, index) => (
					<CustomButton key={index} $width='90%' $height='auto' $padding='0' $backgroundColor='transparent' onClick={GoLikesTemplate}>
						<StyledImg src={src} $width="100%" />
					</CustomButton>
				))}
			</CustomBox>
		</CustomColumn>
	);
}

export default Likes;
