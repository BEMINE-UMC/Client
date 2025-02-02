import CustomBox from "../../components/CustomBox";
import CustomButton from "../../components/CustomButton";
import CustomRow from "../../components/CustomRow";
import CustomDivider from "../../components/CustomDivider";
import CustomFont from "../../components/CustomFont";

const MobileWorkspace = () => {
	return (
		<CustomBox $width="90%" $alignitems="center" $justifycontent="center" $height="auto" $padding="1rem 0.5rem" $border="1px solid #D9D9D9" $backgroundcolor="white">
			<CustomRow $width="100%" $gap="1rem">
				<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
					<CustomFont $color="#666666" $fontweight="bold">워크스페이스</CustomFont>
				</CustomButton>
				<CustomDivider $backgroundcolor="#D9D9D9" $width="1px" $height="2rem" />

				<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
					<CustomFont $color="#666666" $fontweight="bold">최근 본 게시물</CustomFont>
				</CustomButton>
				<CustomDivider $backgroundcolor="#D9D9D9" $width="1px" $height="2rem" />

				<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
					<CustomFont $color="#666666" $fontweight="bold">좋아요</CustomFont>
				</CustomButton>
				<CustomDivider $backgroundcolor="#D9D9D9" $width="1px" $height="2rem" />

				<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
					<CustomFont $color="#666666" $fontweight="bold">북마크</CustomFont>
				</CustomButton>
			</CustomRow>
		</CustomBox>
	);
};

export default MobileWorkspace;
