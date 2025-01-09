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
        <NoticeCategory onCategorySelect={handleCategorySelect} />
        <PostList selectedCategory={selectedCategory} />
    </NoticeBoardContainer>
  );
};

export default NoticeBoard;

const NoticeBoardContainer = styled.div`
  display: flex; 
  flex-direction: column; /* 자식 요소를 세로로 배치 */
  justify-content: flex-start; /* 세로 방향 상단 정렬 */
  align-items: flex-start; /* 가로 방향 왼쪽 정렬 */
  width: 100vw; 
  margin: 0; /* 부모의 중앙 정렬 영향 제거 (중요!) */
  padding: 20px; 
  padding-left: 100px; /* 왼쪽 간격 추가 */
  min-height: 100vh; /* 화면 높이 */
  position: relative; /* 부모로부터의 정렬 영향 제거 */
  box-sizing: border-box; 
  gap: 10px;
`;