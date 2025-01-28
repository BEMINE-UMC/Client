import React from "react";
import styled from "styled-components";

import BeMine3D from "../../assets/images/main/BeMine_3D.png";

interface TemplateCategoryProps {
  onCategorySelect: (category: string) => void;
}

const TemplateCategory: React.FC<TemplateCategoryProps> = ({ onCategorySelect }) => {
  const categories = [
    { name: "전체", image: BeMine3D },
    { name: "콘텐츠 마케터", color: "#0E003E" },
    { name: "브랜드 마케터", color: "#0E003E" },
    { name: "퍼포먼스 마케터", color: "#0E003E" },
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

export default TemplateCategory;

const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 16px 0;

  @media (max-width: 480px) {
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 버튼이 가로로 배치되도록 설정 */
    // max-width: 1000px;
    display: inline-flex; /* 자식 요소를 가로로 정렬 */
    width: 100%; /* 부모 요소의 너비에 맞춤 */
    overflow-x: auto; /* 가로 스크롤 활성화 */
    -webkit-overflow-scrolling: touch; /* 부드러운 스크롤 (iOS) */
    white-space: nowrap; /* 자식 요소가 한 줄로 배치되도록 설정 */

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

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

const CategoryImage = styled.div<{ src?: string; color?: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${({ color }) => color || "#0E003E"};
  background-image: ${({ src }) => (src ? `url(${src})` : "none")};
  background-size: contain;
  background-position: center;
`;