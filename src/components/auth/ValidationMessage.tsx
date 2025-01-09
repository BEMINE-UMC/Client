import styled from 'styled-components';

interface ValidationMessageProps {
  /** 표시할 유효성 메시지 */
  message: string;
}

/** 입력 필드 아래에 오류 메시지를 표시하는 컴포넌트 */
const StyledValidationMessage = styled.p`
  font-size: 12px;
  color: red;
  margin-top: -10px;
  margin-bottom: 15px;
`;

const ValidationMessage: React.FC<ValidationMessageProps> = ({ message }) => {
  return <StyledValidationMessage>{message}</StyledValidationMessage>;
};

export default ValidationMessage;
