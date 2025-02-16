import styled from 'styled-components';
import { BREAKPOINTS } from '../../hooks/useResponsive';
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
  max-width: 95%;  /* 화면 너비의 95%로 제한 */
  height: ${props => props.$height || 'auto'};
  margin: 0 auto;
  overflow: hidden;
  padding: 45px 32px;
  border-radius: 20px;
  background-color: #fff;
  box-sizing: border-box;
  max-height: 100%;
  min-height: 409px;
  position: relative;
  font-size: 19px;
  
  /* 내부 요소들이 컨테이너를 벗어나지 않도록 설정 */
  & > * {
    max-width: 100%;
    box-sizing: border-box;
  }
  
  /* form 요소도 최대 너비 제한 */
  & form {
    width: 100%;
    max-width: 100%;
    
    /* form 내부의 모든 요소도 최대 너비 제한 */
    & > * {
      max-width: 100%;
      box-sizing: border-box;
    }
  }
  
  /* box-shadow를 사용한 블러 테두리 효과 */
  box-shadow: 
    0 0 5px 3px rgba(255, 225, 0, 0.6),
    0 0 10px 8px rgba(255, 225, 0, 0.3);
  
  background: #ffffff;

  /* 반응형 스타일 추가 */
  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    width: 361px;
    min-width: 320px;
    max-width: 95%;
    padding: 8% 5%;
    font-size: 12px;
    
    & > * {
      max-width: 100%;
      box-sizing: border-box;
    }
    
    & form {
      width: 100%;
      max-width: 100%;
      
      & > * {
        max-width: 100%;
        box-sizing: border-box;
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    width: 566px;
    max-width: 95%;
    padding: 7% 6%;
    font-size: 12px;

    & > * {
      max-width: 100%;
      box-sizing: border-box;
    }
    
    & form {
      width: 100%;
      max-width: 100%;
      
      & > * {
        max-width: 100%;
        box-sizing: border-box;
      }
    }
  }
`;

//내부 padding props로 받아오기
export default FormContainer;
