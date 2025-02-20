import React from "react";
import CustomColumn from "../../pages/mine/components/CustomColumn";
import CustomRow from "../../pages/mine/components/CustomRow";
import CustomFont from "../../pages/mine/components/CustomFont";
import StyledImg from "../../pages/mine/components/StyledImg";
import CustomButton from "../../pages/mine/components/CustomButton";
import { DownloadModal as StyledDownloadModal } from "../../pages/mine/main_component/workspaces/WorkSpaceStyles";


import logo from "../../assets/images/main/BeMine_3D.svg";

interface DownloadModalProps {
  isDownloadModal: boolean;
  handleRatingClick: (index: number) => void;
  handlePdfDownload: () => void;
  selectedRating: number;
  rankBeforeImages: string[];
  rankAfterImages: string[];
}

const DownloadModal: React.FC<DownloadModalProps> = ({
  isDownloadModal,
  handleRatingClick,
  handlePdfDownload,
  selectedRating,
  rankBeforeImages,
  rankAfterImages,
}) => {
  if (!isDownloadModal) return null;

  return (
    <StyledDownloadModal
      $backgroundcolor="white"
      $borderradius="1rem"
      $width="80%"
      $height="auto"
      $padding="1rem"
      $boxshadow="rgba(0 0 0 0.2)"
    >
      <CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
        <StyledImg src={logo} $width="5rem" />
        <CustomFont $color="black" $font="1.3rem" $fontweight="bold">
          해당 템플릿이 마음에 드셨나요?
        </CustomFont>
        <CustomFont $color="black" $font="1rem">인증 뱃지를 위해 별점을 남겨주세요.</CustomFont>

        {/* 별점 매기기 UI */}
        <CustomRow $width="auto" $justifycontent="center" $gap="0.5rem">
          {rankBeforeImages.map((beforeImage, index) => (
            <StyledImg
              key={index}
              src={index < selectedRating ? rankAfterImages[index] : beforeImage}
              $width="3rem"
              $height="3rem"
              $cursor="pointer"
              onClick={() => handleRatingClick(index)}
            />
          ))}
        </CustomRow>

        <CustomFont $color="#666666" $font="1rem">
          별점을 매겨주신 후 템플릿이 다운로드 돼요!
        </CustomFont>
        <CustomButton
          $backgroundColor={selectedRating > 0 ? "#FFE100" : "#D9D9D9"}
          $padding="0.5rem"
          $width="auto"
          $height="auto"
          onClick={handlePdfDownload}
        >
          <CustomFont $color="white" $fontweight="bold">다음</CustomFont>
        </CustomButton>
      </CustomColumn>
    </StyledDownloadModal>
  );
};

export default DownloadModal;
