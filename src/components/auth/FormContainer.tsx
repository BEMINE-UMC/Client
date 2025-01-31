import styled from 'styled-components';

interface FormContainerProps {
  $height?: string;
}

/** 전체 폼을 감싸는 레이아웃 컴포넌트 */
const FormContainer = styled.div<FormContainerProps>`
  display: flex;
  color: black;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 616px;
  height: ${props => props.$height || 'auto'};
  margin: 0 auto;
  overflow: hidden;
  padding: 45px 32px;
  border-radius: 20px;
  background-color: #fff;
  box-sizing: border-box; 
  max-width: 100%;
  max-height: 100%;
  min-height: 409px;
  position: relative;
  
  /* box-shadow를 사용한 블러 테두리 효과 */
  box-shadow: 
    0 0 5px 3px rgba(255, 225, 0, 0.6),  /* 중간 블러 */
    0 0 10px 8px rgba(255, 225, 0, 0.3); /* 넓은 블러 */
  
  /* 배경색 */
  background: #ffffff;
`;

//내부 padding props로 받아오기
export default FormContainer;
