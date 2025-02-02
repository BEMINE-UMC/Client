import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomColumn from "../components/CustomColumn";
import CustomFont from "../components/CustomFont";
import CustomBox from "../components/CustomBox";
import StyledImg from "../components/StyledImg";
import CustomButton from "../components/CustomButton";

import mockDataLikes1 from '../../../assets/images/mockData/mockData_mine_Likes_1.png';
import mockDataLikes2 from '../../../assets/images/mockData/mockData_mine_Likes_2.png';

const mockDataLikes = [mockDataLikes1, mockDataLikes2];

// Styled-components for responsiveness
const ResponsiveColumn = styled(CustomColumn)`
  width: 25%;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    width: 80%;
    min-height: auto;
  }

  @media (max-width: 768px) {
    width: 90%;
    min-height: auto;
  }
`;

const ResponsiveImg = styled(StyledImg)`
  width: 100%;

  @media (max-width: 768px) {
    border-radius: 0.5rem;
  }
`;

const ResponsiveBox = styled(CustomBox)`
  display: grid;
  grid-template-columns: 1fr; /* 기본적으로 한 줄 */
  gap: 1rem;
  width: 80%;
  height: auto;
  padding: 0.5rem;
  background-color: transparent;
  border: 1.5px solid #d9d9d9;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  @media (max-width: 1024px) {
    width: 90%;
    grid-template-columns: repeat(2, 1fr); /* 태블릿에서는 2열 */
  }

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr); /* 모바일에서도 2열 */
    border-radius: 0.8rem;
  }
`;

const Likes = () => {
	const navigate = useNavigate();
	const GoLikesTemplate = () => {
		navigate('/my'); // 실제 경로로 나중에 바꾸기 - 좋아요 누른 게시물 버튼
	};

	return (
		<ResponsiveColumn>
			<CustomColumn $height="1vh"></CustomColumn>
			<CustomFont $color="black" $font="0.9rem" $fontweight="bold">
				좋아요 누른 템플릿
			</CustomFont>

			<ResponsiveBox>
				{mockDataLikes.map((src, index) => (
					<CustomButton
						key={index}
						$width="100%" /* 그리드 아이템이 가로 영역을 채우도록 설정 */
						$height="auto"
						$padding="0"
						$backgroundColor="transparent"
						onClick={GoLikesTemplate}
					>
						<ResponsiveImg src={src} />
					</CustomButton>
				))}
			</ResponsiveBox>
		</ResponsiveColumn>
	);
};


export default Likes;
