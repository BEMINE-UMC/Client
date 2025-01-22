import React from "react";
import styled from "styled-components";
import { Post } from "./postMockData";
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
          userImage={data.userImage}
          author={data.author}
          userInformation={data.userInformation}   
        />
        <ContentSection
          title={data.title}
          contentImage={data.contentImage}
          content={data.content}
        />
        <FooterSection author={data.author} contentImage={data.contentImage} />
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