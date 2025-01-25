import React from "react";
import styled from "styled-components";

interface ContentSectionProps {
  title: string;
  contentImage: string;
  content: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, contentImage, content }) => {
  return (
    <Wrapper>
      <ModalTitle>{title}</ModalTitle>
      <ModalImage src={contentImage} alt="Content Image" />
      <Content>{content}</Content>
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

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

const ModalTitle = styled.h4`
  margin: 20px 0;
  font-size: 30px;
  font-weight: bold;
  color: black;

  @media (max-width: 480px) {
    font-size: 20px;
    margin: 10px 0;
  }
`;

const ModalImage = styled.img`
  width: 75%;
  height: auto;
  border-radius: 10px;
  margin: 20px 0;

  @media (max-width: 480px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const Content = styled.div`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-bottom: 7.5%;  

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 10%;
  }
`;