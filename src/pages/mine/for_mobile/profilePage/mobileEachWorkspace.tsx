import { useState } from "react";
import styled from "styled-components";

import CustomColumn from "../../components/CustomColumn";
import CustomFont from "../../components/CustomFont";
import CustomButton from "../../components/CustomButton";
import StyledImg from "../../components/StyledImg";
import CustomBox from "../../components/CustomBox";

import pdfMock from "../../../../assets/images/mine/mine_PDF_mockData.pdf";
import template1 from "../../../../assets/images/mockData/mockData_mine_template_1.png";
import template2 from "../../../../assets/images/mockData/mockData_mine_template_2.png";
import template3 from "../../../../assets/images/mockData/mockData_mine_template_3.png";
import template4 from "../../../../assets/images/mockData/mockData_mine_template_4.png";
import logo from "../../../../assets/images/main/BeMine_3D.png";
import CustomRow from "../../components/CustomRow";

import rank_before_1 from "../../../../assets/images/mine/rank_img/mine_rank_before_1.svg";
import rank_before_2 from "../../../../assets/images/mine/rank_img/mine_rank_before_2.svg";
import rank_before_3 from "../../../../assets/images/mine/rank_img/mine_rank_before_3.svg";
import rank_before_4 from "../../../../assets/images/mine/rank_img/mine_rank_before_4.svg";
import rank_before_5 from "../../../../assets/images/mine/rank_img/mine_rank_before_5.svg";
import rank_before_6 from "../../../../assets/images/mine/rank_img/mine_rank_before_6.svg";

import rank_after_1 from "../../../../assets/images/mine/rank_img/mine_rank_after_1.svg";
import rank_after_2 from "../../../../assets/images/mine/rank_img/mine_rank_after_2.svg";
import rank_after_3 from "../../../../assets/images/mine/rank_img/mine_rank_after_3.svg";
import rank_after_4 from "../../../../assets/images/mine/rank_img/mine_rank_after_4.svg";
import rank_after_5 from "../../../../assets/images/mine/rank_img/mine_rank_after_5.svg";
import rank_after_6 from "../../../../assets/images/mine/rank_img/mine_rank_after_6.svg";

const mockDataTemplates = [template1, template2, template3, template4];

const rankBeforeImages = [
	rank_before_1,
	rank_before_2,
	rank_before_3,
	rank_before_4,
	rank_before_5,
	rank_before_6,
];

const rankAfterImages = [
	rank_after_1,
	rank_after_2,
	rank_after_3,
	rank_after_4,
	rank_after_5,
	rank_after_6,
];

const MobileEachWorkspace = () => {
	const [selectedRating, setSelectedRating] = useState(0); // 별점 상태 (0~6)
	const [isDownloadModal, setIsDownloadModal] = useState(false);
	const [showNotification, setShowNotification] = useState(false); // 좋아요 버튼 알림
	const [isHeartClicked, setIsHeartClicked] = useState(false); // 좋아요 상태

	const handleHeartClick = () => {
		setIsHeartClicked(!isHeartClicked);
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false);
		}, 3000);
	};

	const handleDownloadClick = () => {
		setIsDownloadModal(true);
	};

	const handlePdfDownload = () => {
		const link = document.createElement("a");
		link.href = pdfMock;
		link.download = "template.pdf";
		link.click();
		setIsDownloadModal(false);
		setSelectedRating(0); // 별점 초기화
	};

	const handleRatingClick = (index: number) => {
		setSelectedRating(index + 1);
	};

	const openPdfInNewTab = () => {
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		const width = Math.floor(screenWidth * 0.8);
		const height = Math.floor(screenHeight * 0.8);
		const left = Math.floor((screenWidth - width) / 2);
		const top = Math.floor((screenHeight - height) / 2);

		const newTab = window.open(
			"",
			"_blank",
			`width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
		);

		if (newTab) {
			newTab.document.write(`
        <html>
          <head>
            <title>PDF Viewer</title>
            <style>
              body {
                margin: 0;
                font-family: Arial, sans-serif;
              }
              .toolbar {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background-color: #f1f1f1;
                border-bottom: 1px solid #ccc;
              }
              iframe {
                width: 100%;
                height: calc(100% - 50px);
                border: none;
              }
            </style>
          </head>
          <body>
            <div class="toolbar">
              <button id="heart-button" style="font-size: 20px;">❤️</button>
              <button id="download-button" style="font-size: 20px;">📥</button>
			  <button id="edit-button" style="font-size: 20px;">✏️</button>
			  <button id="chat-button" style="font-size: 20px;">💬</button>
            </div>
            <iframe src="${pdfMock}"></iframe>
            <script>
              document.getElementById('heart-button').addEventListener('click', function() {
                window.opener.postMessage('liked', '*');
              });

              document.getElementById('download-button').addEventListener('click', function() {
                window.opener.postMessage('openDownloadModal', '*');
              });

			  document.getElementById('edit-button').addEventListener('click', function() {
				if (window.opener) {
					window.opener.location.href = '/mobiletemplatepage';
				}
			});
            </script>
          </body>
        </html>
      `);
			newTab.document.close();
		} else {
			alert("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
		}
	};

	window.addEventListener("message", (event) => {
		if (event.data === "openDownloadModal") {
			handleDownloadClick();
		}
		if (event.data === "liked") {
			handleHeartClick();
		}
	});

	return (
		<CustomColumn $width="100%" $minHeight="100vh" $alignitems="center" $justifycontent="flex-start">
			{showNotification && (
				<CustomBox
					$width="80%"
					$height="auto"
					$backgroundcolor="white"
					$borderradius="1rem"
					$alignitems="center"
					$justifycontent="center"
					$overflowy="hidden"
					$boxshadow="0px 4px 10px rgba(0, 0, 0, 0.2), 0 0 0 1px #D9D9D9"
					$padding="1rem"
				>
					<CustomRow $width="100%" $height="auto" $alignitems="center" $justifycontent="center">
						<StyledImg src={logo} $width="4rem" />
						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center">
							<CustomFont $color="black" $font="1rem" $fontweight="bold">
								내가 찜한 템플릿을 다운로드 받아보세요!
							</CustomFont>
							<CustomFont $color="black">pdf 파일로 다운로드하여 사용할 수 있어요.</CustomFont>
						</CustomColumn>
					</CustomRow>
				</CustomBox>
			)}

			<CustomColumn $width="90%" $gap="1rem" $alignitems="center">
				{mockDataTemplates.map((src, index) => (
					<CustomButton
						key={index}
						$width="auto"
						$height="auto"
						$padding="0"
						$backgroundColor="transparent"
						onClick={openPdfInNewTab}
					>
						<StyledImg src={src} alt={`Template ${index + 1}`} $width="100%" />
					</CustomButton>
				))}

				{isDownloadModal && (
					<DownloadModal>
						<CustomColumn $width="100%" $alignitems="center" $justifycontent="center">
							<StyledImg src={logo} $width="5rem" />
							<CustomFont $color="black" $font="1.3rem" $fontweight="bold">
								해당 템플릿이 마음에 드셨나요?
							</CustomFont>
							<CustomFont $color="black" $font="1rem">
								인증 뱃지를 위해 별점을 남겨주세요.
							</CustomFont>
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
								disabled={selectedRating === 0}
							>
								<CustomFont $color="white" $fontweight="bold">
									다음
								</CustomFont>
							</CustomButton>
						</CustomColumn>
					</DownloadModal>
				)}
			</CustomColumn>
		</CustomColumn>
	);
};

export default MobileEachWorkspace;

const DownloadModal = styled(CustomBox)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  background-color: white;
  border-radius: 1rem;
  width: 80%;
  height: auto;
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;
