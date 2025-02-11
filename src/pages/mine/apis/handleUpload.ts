import axios from "axios";

export const handleUpload = async (
	title: string,
	filePDF: File | null,
	fileShareState: string,
	thumbnail: File | null,
	tCategoryId: number,
	accessToken: string
) => {
	if (!filePDF || !thumbnail) {
		alert("파일과 썸네일을 업로드해주세요.");
		return;
	}

	const formData = new FormData();
	formData.append("title", title);
	formData.append("filePDF", filePDF);
	formData.append("fileShareState", fileShareState);
	formData.append("thumbnail", thumbnail);
	formData.append("tCategoryId", String(tCategoryId));

	// console.log("pdfFile 타입:", filePDF instanceof File);
	// console.log("thumbnailFile 타입:", thumbnail instanceof File);

	// for (const pair of formData.entries()) {
	// 	console.log("formData key:", pair[0], "값:", pair[1]);
	// }

	try {
		const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/template/create`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status === 200 && response.data.success) {
			alert("템플릿을 업로드했습니다.");
			return true;
		}

	} catch (error) {
		console.error("템플릿 업로드 실패:", error);
		alert("업로드에 실패했습니다.");
		console.log('템플릿 업로드 요청 보낸 형태는:', formData);
		return false;
	}
};
