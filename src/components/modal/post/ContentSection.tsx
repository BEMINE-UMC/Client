import React from "react";
import styled from "styled-components";
import DOMPurify from "dompurify"; // XSS 방지용 라이브러리
import { AiFillHeart } from "react-icons/ai"; // 아이콘 추가


interface ContentSectionProps {
  title: string;
  contentImage?: string;
  content: string;
  liked: boolean;
  onLikeClick: () => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, content, liked, onLikeClick }) => {
  const sanitizedContent = DOMPurify.sanitize(content); // 🛑 XSS 방지를 위해 HTML을 정화

  return (
    <Wrapper>
      <ModalTitle>{title}</ModalTitle>
      <LikeButton onClick={onLikeClick}>
          {liked ? <AiFillHeart className="liked" /> : <AiFillHeart className="not-liked" />}
        </LikeButton>
      <Content dangerouslySetInnerHTML={{ __html: sanitizedContent }} /> {/* HTML 렌더링 */}
    </Wrapper>
  );
};

export default ContentSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  position: relative;

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

const ModalTitle = styled.h4`
  margin: 20px 0;
  font-size: 30px;
  font-weight: bold;
  color: black;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin: 10px 0;
  }
`;

const Content = styled.div`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-bottom: 7.5%;  
  width: 75%;

  @media (max-width: 768px) {
    font-size: 10px;
    margin-bottom: 10%;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 10%;
  }
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 40px;
  color: #ff4d4f; // 좋아요 색상
  transition: color 0.3s;

  position: absolute; /* 절대 위치로 변경 */
  top: 0; /* 위치 조정 */
  right: 0; /* 오른쪽에 배치 */

  &:hover {
    color: #ff7875;
  }

  & .liked {
    color: #ff4d4f; // 좋아요 상태일 때 색상
  }

  & .not-liked {
    color: #ccc; // 좋아요 안 했을 때 색상
  }

  @media (max-width: 768px) {
    font-size: 25px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;