import React from "react";
import styled from "styled-components";

import Empty from "../../../assets/images/main/Empty.png"

interface FooterProps {
  author: string;
  contentImage?: string; // 이미지가 없을 수도 있음
}

const FooterSection: React.FC<FooterProps> = ({ author, contentImage }) => {
  const imageSrc = contentImage || Empty;
  
  return (
    <>
        <Container>
            <Header>
                <Author>{author}가 작성한 다른 게시물</Author>
            </Header>
        
            <ImageContainer>
                {/* 유틸 함수 적용 */}
                <StyledImage src={imageSrc} alt={`${author}님의 게시물`} />
            </ImageContainer>

        </Container>
    </>
  );
};

export default FooterSection;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* 요소를 세로로 나열 */
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  justify-content: center;
  align-items: center; /* 수평 중앙 정렬 */
  gap: 20px;

  @media (max-width: 480px) {
    padding: 10px;
    gap: 15px;
  }
`;

const Header = styled.div`

  
  margin-bottom: 15px;
`;

const Author = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 12.5px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 480px) {
    height: 150px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px; /* 더 둥글게 설정 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 애니메이션 추가 */
  overflow: visible;

  &:hover {
    transform: scale(1.05); /* 이미지 확대 */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  }

  @media (max-width: 768px) {
    width: 50%;
    height: 50%;
    border-radius: 20px;
    justify-content: center;
  }

  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;