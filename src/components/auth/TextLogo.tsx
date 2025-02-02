import styled from 'styled-components';
import BeMineLogo from "../../assets/images/main/Logo_Text.svg";
import { BREAKPOINTS } from '../../hooks/useResponsive';

interface TextLogoProps {
  /** 중앙 정렬 여부 */
  center?: boolean;
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;  /* 기본값: 왼쪽 정렬 */
  width: 100%;
  margin-bottom: 45px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    justify-content: center;  /* 모바일: 중앙 정렬 */
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    justify-content: center;  /* 태블릿: 중앙 정렬 */
  }
`;

const LogoImage = styled.img<TextLogoProps>`
  width: 145px;
  height: 32px;
  display: block;
  margin-left: 5px;

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    width: 145px;
    height: 32px;
    margin-left: 0;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    width: 231px;
    height: 32px;
    margin-left: 0;
  }
`;

const TextLogo: React.FC<TextLogoProps> = ({ center = false }) => {
  return (
    <LogoContainer>
      <LogoImage 
        src={BeMineLogo} 
        alt="BeMine Logo" 
        center={center}
      />
    </LogoContainer>
  );
};

export default TextLogo;
