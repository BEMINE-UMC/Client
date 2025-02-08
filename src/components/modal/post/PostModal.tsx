import React from "react";
import styled from "styled-components";

import { Post } from "../../main/type/Post";

import UserSection from "./UserSection";
import ContentSection from "./ContentSection";
import FooterSection from "./FooterSection";


interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Post | null;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <UserSection
          userImage={data.userImage || ""}  // userImage 추가
          author={data.authorName}  // authorName 사용
          userInformation={data.userInformation || ""}  // userInformation 추가
        />
        <ContentSection
          title={data.title}
          contentImage={data.thumbnail}  // contentImage를 thumbnail로 변경
          content={data.content || ""}  // content 필드 추가
        />
        <FooterSection
          author={data.authorName}
          contentImage={data.thumbnail}  // contentImage를 thumbnail로 변경
        />
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  @media (max-width: 768px) {
    justify-content: center;
    width: min(100vw, 100%); /* 화면 크기에 맞게 자동 조정 */
    background-color: white;
    height: 100vh; /* ✅ 모바일에서도 꽉 차도록 수정 */
  }

  @media (max-width: 480px) {
    justify-content: center;
    width: min(100vw, 100%); /* 화면 크기에 맞게 자동 조정 */
    height: auto;
    max-width: 480px;
    height: 100vh; /* ✅ 모바일에서도 꽉 차도록 수정 */
    overflow: hidden; /* ✅ 스크롤 방지 */
  }
`;

const ModalContent = styled.div`
  background: #fff;
  width: 110%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.01);
    width: min(100vw, 50%); /* 화면 크기에 맞게 자동 조정 */
    height: auto;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    width: 90%; /* ✅ 모바일에서 적절한 크기 유지 */
    padding: 10px; /* ✅ 내부 간격을 줄여 공간 활용 개선 */
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2); /* ✅ 모바일에서도 배경과 구분되도록 수정 */
    overflow: hidden; /* ✅ 내부 스크롤도 방지 */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
`;