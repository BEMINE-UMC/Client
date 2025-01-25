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
  padding: 34px 32px;
  border-radius: 20px;
  background-color: #fff;
  box-sizing: border-box; 
  max-width: 100%;
  max-height: 100%;
  min-height: 409px;
  
  /* 부드러운 테두리 효과 */
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 20px;
    background: linear-gradient(
      to right,
      rgba(255, 225, 0, 0.5),
      rgba(255, 225, 0, 0.7)
    );
    z-index: -1;
    filter: blur(4px);
  }

  /* 배경색이 테두리와 자연스럽게 어우러지도록 */
  background: #ffffff;
  box-shadow: 0 0 10px rgba(255, 225, 0, 0.2);
`;

//내부 padding props로 받아오기
export default FormContainer;
