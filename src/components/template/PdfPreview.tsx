import styled from 'styled-components';
// import { IoIosHeart } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { IoMdChatbubbles } from "react-icons/io";

import DownloadModal from './DownloadModal';
import { useState } from 'react';

import Before_1 from "../../assets/images/mine/rank_img/mine_rank_before_1.svg";
import Before_2 from "../../assets/images/mine/rank_img/mine_rank_before_2.svg";
import Before_3 from "../../assets/images/mine/rank_img/mine_rank_before_3.svg";
import Before_4 from "../../assets/images/mine/rank_img/mine_rank_before_4.svg";
import Before_5 from "../../assets/images/mine/rank_img/mine_rank_before_5.svg";
import Before_6 from "../../assets/images/mine/rank_img/mine_rank_before_6.svg";

import After_1 from "../../assets/images/mine/rank_img/mine_rank_after_1.svg"
import After_2 from "../../assets/images/mine/rank_img/mine_rank_after_2.svg"
import After_3 from "../../assets/images/mine/rank_img/mine_rank_after_3.svg"
import After_4 from "../../assets/images/mine/rank_img/mine_rank_after_4.svg"
import After_5 from "../../assets/images/mine/rank_img/mine_rank_after_5.svg"
import After_6 from "../../assets/images/mine/rank_img/mine_rank_after_6.svg"

interface PdfPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onLike: () => void; // ✅ 추가: 좋아요 클릭 이벤트 핸들러
  onDownload: (fileURL: string) => void; // ✅ 추가: 다운로드 클릭 이벤트 핸들러
  onEdit?: () => void; // ✅ 추가: 편집 버튼 (선택적)
    thumbnail: string;
    filePDF?: string; // PDF 파일 경로
    templateCreatedAt: string;
    templateId: number;
    title: string;
    authorId: number;
    authorName: string;
    categoryId: number;
    categoryName: string;
    isLiked?: boolean;
    likesCount: number;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ isOpen, filePDF, onClose, onLike, onDownload, onEdit, isLiked }) => {
  const [isDownloadModal, setDownloadModal] = useState(false); // ✅ 다운로드 모달 상태
  const [selectedRating, setSelectedRating] = useState(0); // ✅ 별점 상태
  
  const handleDownloadClick = () => {
    setDownloadModal(true); // ✅ 다운로드 모달 열기
  };

  const handleCloseDownloadModal = () => {
    setDownloadModal(false); // ✅ 다운로드 모달 닫기
  };

  const handleRatingClick = (index: number) => {
    setSelectedRating(index + 1);
  };

  const handlePdfDownload = () => {
    if (filePDF && selectedRating > 0) {
      const link = document.createElement('a');
      link.href = filePDF;
      link.download = 'template.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      handleCloseDownloadModal(); // ✅ 다운로드 후 모달 닫기
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <>
    <Overlay onClick={onClose}>
      <PdfContainer onClick={(e) => e.stopPropagation()}>
        <iframe src={filePDF} width="100%" height="100%" />

        <FloatingButtons>
          {/* <IoIosHeart
            size={40}
            color={isLiked ? "red" : "gray"}
            onClick={onLike}
            style={{ cursor: 'pointer' }}
          /> */}
          <FaFileDownload
              size={40}
              style={{ cursor: 'pointer', color: 'gray' }}
              onClick={handleDownloadClick} // ✅ 다운로드 버튼 클릭 시 모달 열기
            />
          {onEdit && ( // ✅ onEdit이 있는 경우만 렌더링
            <BiSolidPencil size={40} style={{ cursor: 'pointer', color: 'gray' }} onClick={onEdit} />
          )}
          <IoMdChatbubbles size={40} style={{ cursor: 'pointer', color: 'gray' }} onClick={() => alert('Coming Soon..')}  />
        </FloatingButtons>
      </PdfContainer>
    </Overlay>

    {/* ✅ 다운로드 모달 추가 */}
    {isDownloadModal && (
      <DownloadModal
        isDownloadModal={isDownloadModal}
        handleRatingClick={handleRatingClick}
        handlePdfDownload={handlePdfDownload}
        selectedRating={selectedRating}
        rankBeforeImages={[Before_1, Before_2, Before_3, Before_4, Before_5, Before_6]}
        rankAfterImages={[After_1, After_2, After_3, After_4, After_5, After_6]}
      />
    )}
    </>
  );
};

export default PdfPreview;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  @media (max-width: 480px) {
  width: min(100vw, 100%); /* 화면 크기에 맞게 자동 조정 */
  }
`;

const PdfContainer = styled.div`
  max-width: 90%;
  min-width: 80%;
  height: 80%;
  background: transparent;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 480px) {
  width: min(100vw, 100%); /* 화면 크기에 맞게 자동 조정 */
  }
`;

const FloatingButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;