import CustomColumn from "../../components/CustomColumn";
import CustomRow from "../../components/CustomRow";
import CustomFont from "../../components/CustomFont";
import StyledImg from "../../components/StyledImg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { IoPencilOutline } from "react-icons/io5";
import mockProfileImg from "../../../../assets/images/mockData/mockData_mine_ProfileImg.png";

// 초기 프로필 데이터 관리
const initialProfileData = {
	name: "유궁둔",
	tagline: "멋진 콘텐츠 마케터가 되고싶은",
	sections: [
		{
			title: "1. 학력 및 전공",
			content: "전공: 미디어 커뮤니케이션 학과\n관련 과목: 디지털 마케팅, 콘텐츠 기획, 커뮤니케이션 전략",
		},
		{
			title: "2. 주요 경험",
			content:
				"인턴십: 스타트업 A사 (6개월):SNS 콘텐츠 기획 및 운영. 주요 플랫폼: Instagram, YouTube.\n\n2개월 만에 팔로워 3,000명 증가 성과.\n대기업 B사 (4개월):디지털 광고 캠페인 분석 및 보고서 작성. 구글 애널리틱스를 활용한 성과 분석.",
		},
		{
			title: "3. 기타 활동",
			content:
				"개인 프로젝트: '커피 브랜드 C' 가상 마케팅 캠페인 기획. Google Ads와 페이스북 광고 시뮬레이션 제작.\n온라인 강의 수료:구글 디지털 마케팅 전문가 과정. Meta Blueprint: Facebook 마케팅.",
		},
		{
			title: "4. 주요 역량 및 성과",
			content:
				"마케팅 툴: Google Analytics, Facebook Ads Manager, Canva.\n성과 중심의 기획 능력:전 회사에서 월간 콘텐츠 도달률 200% 증가 달성. 팀 프로젝트로 캠페인 기획 및 실행.",
		},
	],
};

const MobileProfilePage = () => {
	return (
		<CustomColumn $width="90%" $minHeight="100vh" $alignitems="center" $justifycontent="center">
			{/* 상단 프로필 정보 */}
			<CustomRow $width="100%" $height="auto" $padding="1rem" $gap="1rem">
				<StyledImg src={mockProfileImg} $width="40%" $height="auto" />
				<CustomColumn $width="60%" $height="auto" $gap="1rem" $alignitems="flex-start" $justifycontent="center">
					<CustomFont $font="1.5rem" $color="black" $fontweight="bold">
						{initialProfileData.name}
					</CustomFont>
					<CustomRow $width="100%" $gap="0.5rem" $alignitems="center">
						<CustomFont $font="0.8rem" $color="black">
							{initialProfileData.tagline}
						</CustomFont>
						<CustomButton $width="auto" $height="auto" $backgroundColor="transparent" $padding="0">
							<IoPencilOutline style={{ fontSize: "1rem", color: "#666666" }} />
						</CustomButton>
					</CustomRow>
				</CustomColumn>
			</CustomRow>

			{/* 연혁 섹션 */}
			<CustomColumn $width="100%" $gap="1.5rem" $alignitems="flex-end">
				<CustomButton
					$width="auto"
					$height="auto"
					$backgroundColor="transparent"
					$padding="0"
				>
					<IoPencilOutline style={{ fontSize: "1rem", color: "#666666" }} />
				</CustomButton>
				{initialProfileData.sections.map((section, index) => (
					<CustomColumn key={index} $width="100%" $gap="0.5rem">
						<CustomRow $width="100%" $alignitems="center" $gap="0.5rem" $justifycontent="flex-start">
							<CustomFont $font="1rem" $color="black" $fontweight="bold">
								{section.title}
							</CustomFont>
						</CustomRow>
						<CustomFont $font="0.9rem" $color="#666666">
							{section.content}
						</CustomFont>
					</CustomColumn>
				))}
			</CustomColumn>
		</CustomColumn>
	);
};

export default MobileProfilePage;