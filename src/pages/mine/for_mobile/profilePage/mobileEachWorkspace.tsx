import { useState } from "react";
// import { useLocation } from "react-router-dom";

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
import logo from '../../../../assets/images/main/BeMine_3D.png';
import CustomRow from "../../components/CustomRow";

const mockDataTemplates = [template1, template2, template3, template4];

const MobileEachWorkspace = () => {
	// const location = useLocation();
	// const { message } = location.state || { message: "잘못된 접근입니다." };
	const [showNotification, setShowNotification] = useState(false);

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
                                const link = document.createElement('a');
                                link.href = "${pdfMock}";
                                link.download = "template.pdf";
                                link.click();
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

	// Listen for messages from the new tab
	window.addEventListener("message", (event) => {
		if (event.data === "liked") {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 3000);
		}
	});

	return (
		<CustomColumn $width="100%" $minHeight="100vh" $alignitems="center" $justifycontent="flex-start">
			{/* <CustomFont $color="black"> {message} </CustomFont>
			<CustomFont $color="black">클릭한 버튼에 따라 api 요청 다르게 보내어 반복출력하고 클릭 시 pdf viewer 띄울 예정</CustomFont> */}

			<CustomColumn $height="1rem" />
			{showNotification && (
				<CustomBox $width="80%" $height="auto" $backgroundcolor="white" $borderradius="1rem" $alignitems="center"
					$justifycontent="center" $overflowy="hidden" $boxshadow="0px 4px 10px rgba(0, 0, 0, 0.2), 0 0 0 1px #D9D9D9" $padding="1rem">
					<CustomRow $width="100%" $height="auto" $alignitems="center" $justifycontent="center">
						<StyledImg src={logo} $width="4rem" />
						<CustomColumn $width="100%" $alignitems="flex-start" $justifycontent="center">
							<CustomFont $color="black" $font="1rem" $fontweight="bold">내가 찜한 템플릿을 다운로드 받아보세요!</CustomFont>
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
			</CustomColumn>
		</CustomColumn>
	);
};

export default MobileEachWorkspace;
