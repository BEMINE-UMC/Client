import { useState } from "react";
import styled from "styled-components";
import NoticeCategory from "./NoticeCategory";
import PostList from "./PostList";

const NoticeBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <NoticeBoardContainer>
        <NoticeCategory onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory}/>
        <PostList selectedCategory={selectedCategory} />
    </NoticeBoardContainer>
  );
};

export default NoticeBoard;

const NoticeBoardContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: center;
  width: 100vw; 
  margin: 0; /* 부모의 중앙 정렬 영향 제거 (중요!) */
  padding: 20px; 
  min-height: 100vh; 
  position: relative; /* 부모로부터의 정렬 영향 제거 */
  box-sizing: border-box; 
  gap: 10px;


  
  @media (max-width: 480px) {
    gap: 0px;

  }
`;