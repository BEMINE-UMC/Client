import { useState } from "react";
import TemplateCategory from "../../components/template/TemplateCategory";
import TemplateList from "../../components/template/TemplateList";
import styled from "styled-components";

const TemplatePage = () => {

  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <TemplateCategory onCategorySelect={handleCategorySelect} />
      <TemplateList selectedCategory={selectedCategory} />
    </Container>
  );
};

export default TemplatePage;

const Container = styled.div`
  display: flex; 
  background: linear-gradient(to bottom, #ffffff, #fff6b4);
  flex-direction: column; /* 자식 요소를 세로로 배치 */
  justify-content: flex-start; /* 세로 방향 상단 정렬 */
  align-items: flex-start; /* 가로 방향 왼쪽 정렬 */
  width: 100vw; 
  margin: 0; /* 부모의 중앙 정렬 영향 제거 (중요!) */
  padding: 20px; 
  min-height: 100vh; /* 화면 높이 */
  position: relative; /* 부모로부터의 정렬 영향 제거 */
  box-sizing: border-box; 
  padding-left: 7%; /* 왼쪽 간격 추가 */
  gap: 20px;
  margin-top: 2%;
  
  @media (max-width: 768px) {
      width: min(100vw, 100%); /* 화면 크기에 맞게 자동 조정 */
    }

  @media (max-width: 480px) {
    padding-left: 0px; /* 왼쪽 간격 추가 */
    gap: 0px;
  }
`;