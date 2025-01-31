import styled from 'styled-components';

interface ValidationMessageProps {
  /** 표시할 유효성 메시지 */
  message: string;
  type?: 'error' | 'success';  // type prop을 선택적으로 추가
}

const MessageWrapper = styled.div<{ type?: 'error' | 'success' }>`
  color: ${props => props.type === 'success' ? '#00B700' : '#FF0000'};
  font-size: 15px;
  margin-top: 8px;
  margin-left: 6px;  // 모든 에러 메시지에 왼쪽 마진 6px 추가
`;

/** 입력 필드 아래에 오류 메시지를 표시하는 컴포넌트 */
const ValidationMessage: React.FC<ValidationMessageProps> = ({ message, type = 'error' }) => {
  return <MessageWrapper type={type}>{message}</MessageWrapper>;
};

export default ValidationMessage