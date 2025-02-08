import styled from 'styled-components';
import BeMineLogo from "../../assets/images/main/Logo_Text.svg";
import { BREAKPOINTS } from '../../hooks/useResponsive';

interface TextLogoProps {
  /** 중앙 정렬 여부 */
  center?: boolean;
  /** 하단 여백 */
  marginBottom?: string;
}

const LogoContainer = styled.div<{ $center?: boolean; $marginBottom?: string }>`
  display: flex;
  justify-content: ${props => props.$center ? 'center' : 'flex-start'};
  width: 100%;
  margin-bottom: ${props => props.$marginBottom || '45px'};

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    justify-content: center;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    justify-content: center;
  }
`;

const LogoImage = styled.img`
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

const TextLogo: React.FC<TextLogoProps> = ({ center = false, marginBottom }) => {
  return (
    <LogoContainer $center={center} $marginBottom={marginBottom}>
      <LogoImage 
        src={BeMineLogo} 
        alt="BeMine Logo" 
      />
    </LogoContainer>
  );
};

export default TextLogo;
