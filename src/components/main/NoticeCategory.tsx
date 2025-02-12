import React from "react";
import styled from "styled-components";

import BeMine3D from "../../assets/images/main/BeMine_3D.png";

interface NoticeCategoryProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const NoticeCategory: React.FC<NoticeCategoryProps> = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    { categoryName: "전체", image: BeMine3D }, 
    { categoryName: "콘텐츠 마케터", image: BeMine3D }, 
    { categoryName: "브랜드 마케터", image: BeMine3D },
    { categoryName: "퍼포먼스 마케터", image: BeMine3D },
    { categoryName: "바이럴 마케터", image: BeMine3D },
  ];

  return (

    <CategoryContainer>
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          onClick={() => {
            console.log("선택된 카테고리:", category.categoryName)
            onCategorySelect(category.categoryName);
          }}
          selected={selectedCategory === category.categoryName}
        >
          <CategoryImage
            src={category.image}

          />
          {category.categoryName}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default NoticeCategory;

const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 16px 0;
  margin-bottom: 40px;
  justify-content: flex-start;
  flex-wrap: nowrap;  
  overflow-x: auto;   
  margin-right: 40vw; // 추가한 부분!

  
  @media (max-width: 768px) {
    gap: 8px; 
    margin-left: 10px; 
    margin-right: 15%; 
    margin-bottom: 20px; 
    max-width: 100%;  
    white-space: nowrap; 
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none; /* 스크롤바 숨기기 */
    }
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin-left: 10px;
    margin-right: 0px;
    margin-bottom: 20px;
    overflow-x: auto;
    max-width: 100%;
    white-space: nowrap;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none; /* 스크롤바 숨기기 */
    }
  }
`;

const CategoryButton = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid ${({ selected }) => (selected ? "#ddd" : "#ddd")};
  border-radius: 20px;
  background-color: ${({ selected }) => (selected ? "#f3f3f3" : "#fff")};
  font-size: 14px;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;

  width: auto; /* 버튼 너비 고정되지 않도록 설정 */
  min-width: 120px; 
  height: 40px; 
  text-align: center;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#f3f3f3" : "#f3f3f3")};
  }

  @media (max-width: 768px) {
    padding: 5px 10px; 
    font-size: 10px; 
    gap: 4px; 
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 11px;
    gap: 4px;
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
    width: 20px;
    height: 20px;
    margin-right: 0;
  }
`;