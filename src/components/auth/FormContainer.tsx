import styled from 'styled-components';

/** 전체 폼을 감싸는 레이아웃 컴포넌트 */
const FormContainer = styled.div`
  display: flex;
  color: black;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 616px;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
  padding: 34px 32px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  box-sizing: border-box; 
  /* 아이템이 컨테이너 크기를 초과할 경우 처리 */
  max-width: 100%;
  max-height: 100%;
  min-height: 409px;
`;

//내부 padding props로 받아오기
export default FormContainer;
