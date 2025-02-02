import styled from 'styled-components';
import { BREAKPOINTS } from '../../hooks/useResponsive';

interface ValidationMessageProps {
  /** 표시할 유효성 메시지 */
  message: string;
  type?: 'error' | 'success';  // type prop을 선택적으로 추가
}

interface StyledMessageProps {
  $type: 'error' | 'success';
}

/** 입력 필드 아래에 오류 메시지를 표시하는 컴포넌트 */
const StyledValidationMessage = styled.p<StyledMessageProps>`
  font-size: 12px;
  color: ${props => props.$type === 'success' ? '#00C31A' : 'red'};
  margin-top: -10px;
  margin-bottom: 15px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 10px;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    font-size: 10px;
  }
`;

const ValidationMessage: React.FC<ValidationMessageProps> = ({ message, type = 'error' }) => {
  return <StyledValidationMessage $type={type}>{message}</StyledValidationMessage>;
};

export default ValidationMessage