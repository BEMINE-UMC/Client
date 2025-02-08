import styled from "styled-components";
import { BREAKPOINTS } from '../../hooks/useResponsive';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const StyledLabel = styled.label`
  font-size: 19px;
  display: block;
  margin-bottom: 11px;

  /* 반응형 스타일 추가 */
  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 12px;
    margin-bottom: 4px;
    margin-left: 7px;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    font-size: 12px;
    margin-bottom: 4px;
    margin-left: 7px;
  }
`;

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
