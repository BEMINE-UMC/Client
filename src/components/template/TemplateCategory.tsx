import React from "react";
import styled from "styled-components";

import BeMine3D from "../../assets/images/main/BeMine_3D.png";

interface TemplateCategoryProps {
  onCategorySelect: (category: string) => void;
}

const TemplateCategory: React.FC<TemplateCategoryProps> = ({ onCategorySelect }) => {
  const categories = [
    { name: "전체", image: BeMine3D },
    { name: "퍼포먼스 마케터", color: "#0E003E" },
    { name: "디자이너", color: "#0E003E" },
    { name: "개발자", color: "#0E003E" },
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