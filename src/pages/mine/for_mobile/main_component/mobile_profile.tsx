import { IoIosArrowForward } from "react-icons/io";
import mockProfileImg from '../../../../assets/images/mockData/mockData_mine_ProfileImg.png';
import { useNavigate } from "react-router-dom";

import StyledImg from "../../components/StyledImg";
import CustomRow from "../../components/CustomRow";
import CustomFont from "../../components/CustomFont";
import CustomColumn from "../../components/CustomColumn";
import CustomButton from "../../components/CustomButton";

const MobileProfile = () => {
	const navigate = useNavigate();

	const template = () => { navigate('/writetemplatepage'); }
	const content = () => { navigate('/writecontentpage'); }

	return (
		<CustomColumn $width="90%" $height="auto" $alignitems="center" $justifycontent="center" $gap="1rem">
			<CustomRow $width="100%" $height="auto" $padding="1rem" $gap="1rem">
				<StyledImg src={mockProfileImg} $width="40%" $height="40%" />
				<CustomColumn $width="60%" $height="auto" $gap="1rem" $alignitems="flex-start" $justifycontent="center">
					<CustomFont $font="1.5rem" $color="black" $fontweight="bold">유궁둔</CustomFont>
					<CustomFont $font="0.8rem" $color="black" $fontweight="bold">멋진 콘텐츠 마케터가 되고싶은</CustomFont>
				</CustomColumn>
				<IoIosArrowForward style={{ fontSize: '3rem', color: '#D9D9D9' }} />
			</CustomRow>

			<CustomColumn $width="100%" $height="auto" $gap="0.5rem" $alignitems="flex-start" $justifycontent="center">
				<CustomFont $font="1rem" $color="black" $fontweight="bold">1. 학력 및 전공</CustomFont>
				<CustomFont $font="0.8rem" $color="black">학력: 한국외국어대학교</CustomFont>
				<CustomFont $font="0.8rem" $color="black">전공: 독일어통번역학</CustomFont>
				<CustomFont $font="1rem" $color="black" $fontweight="bold">2. 주요경험</CustomFont>
				<CustomFont $font="0.8rem" $color="black">블라블라데이터</CustomFont>
			</CustomColumn>

			<CustomColumn $width="100%" $height="auto" $gap="0.5rem" $alignitems="center" $justifycontent="center">
				<CustomButton $width='100%' $height='auto' $padding="0.5rem" $backgroundColor="transparent" $border="1px solid #D9D9D9" onClick={content}>
					<CustomFont $color="black" $font="0.8rem" $fontweight="bold">게시물 작성하기</CustomFont>
				</CustomButton>
				<CustomButton $width='100%' $height='auto' $padding="0.5rem" $backgroundColor="transparent" $border="1px solid #D9D9D9" onClick={template}>
					<CustomFont $color="black" $font="0.8rem" $fontweight="bold">템플릿 올리기</CustomFont>
				</CustomButton>
			</CustomColumn>
		</CustomColumn>
	);
};

export default MobileProfile;
