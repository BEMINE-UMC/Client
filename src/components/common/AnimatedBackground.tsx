import styled from 'styled-components';
import BeMine3D from '../../assets/images/main/BeMine_full_3D.svg';
import BeMine3DSmall from '../../assets/images/main/BeMine_3D.svg';
import { BREAKPOINTS } from '../../hooks/useResponsive';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 73%,
    rgba(106, 106, 106, 0.5) 100%
  );
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120vw;
  height: 120vh;
  background-image: url(${BeMine3D});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%) rotate(-30deg);
  opacity: 0.7;

  /* SVG 렌더링 최적화 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* 반응형 스타일 추가 */
  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    width: 200vw;  /* 더 넓게 조정 */
    height: 200vh;  /* 더 높게 조정 */
    background-image: url(${BeMine3DSmall});
    background-size: 130% auto;  /* 크기 조정 */
    transform: translate(-50%, -50%) rotate(-20deg) scale(0.7);  /* scale 추가 */
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    width: 140vw;
    height: 140vh;
    background-image: url(${BeMine3DSmall});
    background-size: 130% auto;
    transform: translate(-50%, -50%) rotate(-20deg);
  }
`;

const AnimatedBackground = () => {
  //console.log('Background image URL:', BeMine3D); // SVG 경로 확인
  return (
    <BackgroundContainer>
      <BackgroundImage />
    </BackgroundContainer>
  );
};

export default AnimatedBackground; 