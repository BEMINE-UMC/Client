import styled from 'styled-components';
import { BREAKPOINTS } from '../../hooks/useResponsive';

interface ValidationMessageProps {
  /** 표시할 유효성 메시지 */
  message: string;
  type?: 'error' | 'success';  // type prop을 선택적으로 추가
  visible?: boolean;  // visible prop 추가
}

interface StyledMessageProps {
  $type: 'error' | 'success';
  $visible?: boolean;  // styled-components prop 추가 ($를 붙여서 DOM에 전달되지 않도록)
}

/** 입력 필드 아래에 오류 메시지를 표시하는 컴포넌트 */
const StyledValidationMessage = styled.p<StyledMessageProps>`
  font-size: 12px;
  color: ${props => props.$type === 'success' ? '#00C31A' : 'red'};
  margin-top: -10px;
  margin-bottom: 15px;
  margin-left: 6px;
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  height: 12px;  // 고정 높이 추가
  line-height: 16px;  // 텍스트 세로 중앙 정렬
  min-height: 12px;  // 최소 높이 보장

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 10px;
    height: 14px;
    line-height: 14px;
    min-height: 14px;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    font-size: 10px;
    height: 14px;
    line-height: 14px;
    min-height: 14px;
  }
`;

const ValidationMessage: React.FC<ValidationMessageProps> = ({ 
  message, 
  type = 'error',
  visible = true  // 기본값은 visible
}) => {
  return (
    <StyledValidationMessage 
      $type={type} 
      $visible={visible}
    >
      {message}
    </StyledValidationMessage>
  );
};

export default ValidationMessage