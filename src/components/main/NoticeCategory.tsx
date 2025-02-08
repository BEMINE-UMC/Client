import React from "react";
import styled from "styled-components";

import BeMine3D from "../../assets/images/main/BeMine_3D.png";

interface NoticeCategoryProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const NoticeCategory: React.FC<NoticeCategoryProps> = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    { categoryName: "전체", image: BeMine3D }, // 이미지 사용
    { categoryName: "콘텐츠 마케터", image: BeMine3D }, // 배경색만 지정
    { categoryName: "브랜드 마케터", image: BeMine3D },
    { categoryName: "퍼포먼스 마케터", image: BeMine3D },
    { categoryName: "바이럴 마케터", image: BeMine3D },
  ];

  return (

    <CategoryContainer>
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          onClick={() => onCategorySelect(category.categoryName)}
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
  margin-right: 50%;


  @media (max-width: 768px) {
    gap: 8px; /* 요소 간격 줄이기 */
    margin-left: 10px; /* 좌측 여백 줄이기 */
    margin-right: 15%;
    margin-bottom: 20px;
    overflow-x: auto;

    max-width: 100%;

    white-space: nowrap;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  /* 모바일 해상도 (최대 480px) 대응 */
  @media (max-width: 480px) {
    gap: 8px; /* 요소 간격 줄이기 */
    margin-left: 10px; /* 좌측 여백 줄이기 */
    margin-right: 0px;
    margin-bottom: 20px;
    overflow-x: auto;

    max-width: 100%;

    white-space: nowrap;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

// 수정 필요
const CategoryButton = styled.button<{ selected?: boolean }>` // ✅ selected prop 추가
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid ${({ selected }) => (selected ? "#ddd" : "#ddd")}; // ✅ 선택된 경우 테두리 강조
  border-radius: 20px;
  background-color: ${({ selected }) => (selected ? "#f3f3f3" : "#fff")}; // ✅ 선택된 경우 배경 변경
  font-size: 14px;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#f3f3f3" : "#f3f3f3")}; // ✅ hover 시 색상 변화
  }

  @media (max-width: 768px) {
    padding: 6px 10px; /* 버튼 크기 줄이기 */
    font-size: 12px; /* 텍스트 크기 줄이기 */

    height: auto; /* 버튼 높이 조정 */
    gap: 4px; /* 이미지와 텍스트 간 간격 조정 */
    margin-left: 5%;
    
  }

  /* 모바일 해상도 (최대 480px) 대응 */
  @media (max-width: 480px) {
    padding: 6px 10px; /* 버튼 크기 줄이기 */
    font-size: 12px; /* 텍스트 크기 줄이기 */

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