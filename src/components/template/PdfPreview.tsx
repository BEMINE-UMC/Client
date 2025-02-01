import styled from 'styled-components';
import { IoIosHeart } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { IoMdChatbubbles } from "react-icons/io";

interface PdfPreviewProps {
  pdfUrl: string;
  onClose: () => void;
  onLike: () => void;
  onDownload: () => void;
  isLiked: boolean;
  onEdit?: () => void; // ✅ 선택적 프로퍼티로 변경
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ pdfUrl, onClose, onLike, onDownload, onEdit, isLiked }) => {
  return (
    <Overlay onClick={onClose}>
      <PdfContainer onClick={(e) => e.stopPropagation()}>
        <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" />

        <FloatingButtons>
          <IoIosHeart
            size={40}
            color={isLiked ? "red" : "gray"}
            onClick={onLike}
            style={{ cursor: 'pointer' }}
          />
          <FaFileDownload size={40} style={{ cursor: 'pointer', color: 'gray' }} onClick={onDownload} />
          {onEdit && ( // ✅ onEdit이 있는 경우만 렌더링
            <BiSolidPencil size={40} style={{ cursor: 'pointer', color: 'gray' }} onClick={onEdit} />
          )}
          <IoMdChatbubbles size={40} style={{ cursor: 'pointer', color: 'gray' }} />
        </FloatingButtons>
      </PdfContainer>
    </Overlay>
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