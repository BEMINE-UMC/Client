import { AiFillHeart, AiOutlineHeart, AiOutlineDownload } from "react-icons/ai";
import styled from "styled-components";
import PdfViewer from "./PdfViewer";

interface TemplateModalProps {
  title: string;
  author: string;
  onClose: () => void;
  file: string | undefined;
  download: string | undefined;
  liked: boolean; // 좋아요 상태
  likesCount: number; // 좋아요 개수
  onLikeToggle: () => void; // 좋아요 상태 변경 함수
}

const TemplateModal: React.FC<TemplateModalProps> = ({ 
  onClose, 
  file,
  download, 
  liked, 
  likesCount, 
  onLikeToggle 
}) => (
  <ModalContainer onClick={onClose}> {/* 모달 외부 클릭 시 닫기 */}
    <ModalContent onClick={(e) => e.stopPropagation()}> {/* 콘텐츠 클릭 시 모달 닫히지 않도록 처리 */}
      <CloseButton onClick={onClose}>×</CloseButton>
      {file ? <PdfViewer file={file} /> : <Placeholder>사용자에 의해 열람이 제한됩니다.</Placeholder>} {/* 파일이 없으면 텍스트 표시 */}
    </ModalContent>
    <LikeButton onClick={(e) => { e.stopPropagation(); onLikeToggle(); }}>
      {liked ? <AiFillHeart size={40} color="#ff6347" /> : <AiOutlineHeart size={40} color="#ff6347" />}
    </LikeButton>
    {download && ( // 다운로드 링크가 존재할 경우에만 버튼 표시
      <DownloadButton
        href={download}
        download
        onClick={(e) => e.stopPropagation()} // 클릭 시 모달 닫히지 않도록 처리
      >
        <AiOutlineDownload />
      </DownloadButton>
    )}
  </ModalContainer>
);

export default TemplateModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 20%;
  padding: 30px;
  border-radius: 10px;
  max-width: 1000px;
  width: 41%;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ff0000;
  }
`;

const Placeholder = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
`;

const LikeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25%; /* 모달 상단에서 25% 위치 */
  right: 30%; /* 오른쪽에서 25% 떨어지게 */
  
  background-color: white; /* 흰색 배경 */
  border-radius: 50%; /* 원형 모양 */

  padding: 10px; /* 내부 여백 */
  font-size: 50px;
  cursor: pointer;
  color: #ff6347;

  &:hover {
    color: #ff0000; /* 호버 시 빨간색 */
  }
  
  /* 클릭 시 모달이 닫히지 않도록 */
  &:active {
    transform: scale(0.95); /* 클릭 시 약간의 크기 축소 효과 */
  }
`;

const DownloadButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 35%; /* 모달 상단에서 35% 위치 */
  right: 30%; /* 오른쪽에서 25% 떨어지게 */
  
  background-color: white; /* 흰색 배경 */
  border-radius: 50%; /* 원형 모양 */

  padding: 10px; /* 내부 여백 */
  font-size: 40px;
  cursor: pointer;
  color: #ff6347;

  &:hover {
    color: #ff0000; /* 호버 시 빨간색 */
  }
  
  /* 클릭 시 모달이 닫히지 않도록 */
  &:active {
    transform: scale(0.95); /* 클릭 시 약간의 크기 축소 효과 */
  }
`;