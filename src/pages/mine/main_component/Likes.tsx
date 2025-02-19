import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import CustomColumn from "../components/CustomColumn";
import CustomFont from "../components/CustomFont";
import CustomBox from "../components/CustomBox";
import StyledImg from "../components/StyledImg";
import CustomButton from "../components/CustomButton";
import CustomRow from "../components/CustomRow";
import emptyLikes from '../../../assets/images/mine/icon_if_empty_likes.svg';
import defaultImg from '../../../assets/images/mine/emptyThumbnail.svg';
import WorkSpaceModals from "./workspaces/WorkSpaceModals";
import pdfMock from '../../../assets/images/mine/mine_PDF_mockData.pdf';
import rank_before_1 from '../../../assets/images/mine/rank_img/mine_rank_before_1.svg';
import rank_before_2 from '../../../assets/images/mine/rank_img/mine_rank_before_2.svg';
import rank_before_3 from '../../../assets/images/mine/rank_img/mine_rank_before_3.svg';
import rank_before_4 from '../../../assets/images/mine/rank_img/mine_rank_before_4.svg';
import rank_before_5 from '../../../assets/images/mine/rank_img/mine_rank_before_5.svg';
import rank_before_6 from '../../../assets/images/mine/rank_img/mine_rank_before_6.svg';

import rank_after_1 from '../../../assets/images/mine/rank_img/mine_rank_after_1.svg';
import rank_after_2 from '../../../assets/images/mine/rank_img/mine_rank_after_2.svg';
import rank_after_3 from '../../../assets/images/mine/rank_img/mine_rank_after_3.svg';
import rank_after_4 from '../../../assets/images/mine/rank_img/mine_rank_after_4.svg';
import rank_after_5 from '../../../assets/images/mine/rank_img/mine_rank_after_5.svg';
import rank_after_6 from '../../../assets/images/mine/rank_img/mine_rank_after_6.svg';

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

// 스타일 코드 하단 분리 

const Likes = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [imageList, setImageList] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isHeartModal, setIsHeartModal] = useState(false);
  const [isDownloadModal, setIsDownloadModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0); // 별점 상태 (0~6)

  const GoTemplateShow = () => { // 템플릿 보기
    setIsOverlayVisible(true);
  };
  const GoTemplateEdit = () => { // 템플릿 수정
    navigate('/writetemplatepage');
  }
  const handleOverlayClose = () => setIsOverlayVisible(false);
  // 좋아요 버튼 클릭 시
  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked); // 하트 상태
    setIsHeartModal(true); // 모달 상태
    setTimeout(() => {
      setIsHeartModal(false);
    }, 3000);
  };

  const handleDownloadClick = () => {
    setIsDownloadModal(true);
  }

  // 별점 매기기
  const handleRatingClick = (index: number) => {
    if (index + 1 === selectedRating) {
      // 별점 낮추기 (현재 선택된 별점을 다시 클릭하면 낮춤)
      setSelectedRating(index);
    } else {
      // 별점 올리기
      setSelectedRating(index + 1);
    }
  };

  // 템플릿 다운로드
  const handlePdfDownload = () => {
    // PDF 파일 경로
    const pdfUrl = pdfMock;

    const link = document.createElement('a');
    link.href = pdfUrl; // 다운로드할 파일의 경로
    link.download = 'template.pdf'; // 저장될 파일 이름
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloadModal(false);
  };

  // 좋아요 누른 게시물 조회 API 요청 함수 
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/myPage/likePost`, {
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          const posts: { postId: number; url: string | null }[] = response.data.success.post;
          if (posts.length > 0) {
            console.log(accessToken);
            console.log(response);
            setImageList(posts.map((post) => post.url ?? defaultImg));
            setMessage("");
          } else {
            setImageList([]);
            setMessage("좋아요 누른 게시물이 아직 없어요.");
          }
        }
      } catch (error) {
        console.error("Error fetching liked posts:", error);
        setImageList([]);
        setMessage("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchLikedPosts();
  }, [accessToken]);

  return (
    <ResponsiveColumn>
      <CustomColumn $height="1vh"></CustomColumn>
      <CustomFont $color="#666666" $font="0.8rem" $fontweight="bold">
        좋아요 누른 템플릿
      </CustomFont>

      <ResponsiveBox>
        {imageList.length > 0 ? (
          imageList.map((src, index) => (
            <CustomButton
              key={index}
              $width="100%"
              $height="auto"
              $padding="0"
              $backgroundColor="transparent"
              onClick={GoTemplateShow}
            >
              <ResponsiveImg src={src} />
            </CustomButton>
          ))
        ) : (
          <CustomRow $width="100%" $alignitems="center" $justifycontent="center">
            {/* <CustomFont $color='gray' $font='0.8rem'>{message}</CustomFont> */}
            <StyledImg src={emptyLikes} $width="8rem" />
          </CustomRow>
        )}
      </ResponsiveBox>

      <WorkSpaceModals
        isOverlayVisible={isOverlayVisible}
        isHeartModal={isHeartModal}
        isDownloadModal={isDownloadModal}
        handleOverlayClose={handleOverlayClose}
        handleHeartClick={handleHeartClick}
        handleDownloadClick={handleDownloadClick}
        handleRatingClick={handleRatingClick}
        handlePdfDownload={handlePdfDownload}
        isHeartClicked={isHeartClicked}
        selectedRating={selectedRating}
        rankBeforeImages={rankBeforeImages}
        rankAfterImages={rankAfterImages}
        GoTemplateEdit={GoTemplateEdit}
      />
    </ResponsiveColumn>
  );
};

export default Likes;

const ResponsiveColumn = styled(CustomColumn)`
  width: 25%;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

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
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    border-radius: 0.5rem;
  }
`;

const ResponsiveBox = styled(CustomBox)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 80%;
  height: auto;
  min-height: 5rem;
  padding: 0.5rem;
  background-color: transparent;
  border: 1px solid #d9d9d9;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  @media (max-width: 1024px) {
    width: 90%;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 0.8rem;
  }
`;
