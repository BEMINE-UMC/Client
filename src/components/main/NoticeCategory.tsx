import React from "react";
import styled from "styled-components";

import BeMine3D from "../../assets/images/main/BeMine_3D.png";

interface NoticeCategoryProps {
  onCategorySelect: (category: string) => void;
}

const NoticeCategory: React.FC<NoticeCategoryProps> = ({ onCategorySelect }) => {
  const categories = [
    { name: "전체", image: BeMine3D }, // 이미지 사용
    { name: "콘텐츠 마케터", color: "" }, // 배경색만 지정
    { name: "브랜드 마케터", color: "" },
    { name: "퍼포먼스 마케터", color: "" },
    { name: "바이럴 마케터", color: "" },
  ];

  return (
    <CategoryContainer>
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          onClick={() => onCategorySelect(category.name)}
        >
          <CategoryImage
            src={category.image}
            color={category.color}
          />
          {category.name}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default NoticeCategory;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0;
  margin-bottom: 40px;
  margin-left: 50px;

  /* 모바일 해상도 (최대 480px) 대응 */
  @media (max-width: 480px) {
    gap: 8px; /* 요소 간격 줄이기 */
    margin-left: 10px; /* 좌측 여백 줄이기 */
    flex-wrap: wrap; /* 여러 줄 배치 */
    margin-bottom: 20px;

  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f3f3f3;
  }

  /* 모바일 해상도 (최대 480px) 대응 */
  @media (max-width: 480px) {
    padding: 6px 10px; /* 버튼 크기 줄이기 */
    font-size: 12px; /* 텍스트 크기 줄이기 */
    min-width: 100px; /* 최소 버튼 너비 설정 */
    height: auto; /* 버튼 높이 조정 */
    gap: 4px; /* 이미지와 텍스트 간 간격 조정 */
    
  }
    
`;

const CategoryImage = styled.div<{ src?: string; color?: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: #0E003E;
  background-image: ${({ src }) => (src ? `url(${src})` : "none")};
  background-size: contain;
  background-position: center;
  
   @media (max-width: 480px) {
    width: 20px; /* 모바일에서 이미지 크기 줄이기 */
    height: 20px;
    margin-right: 0; /* 세로 정렬을 위해 여백 제거 */
  }

  `;