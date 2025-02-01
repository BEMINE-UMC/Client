import styled from 'styled-components';
import BeMine3D from '../../assets/images/main/BeMine_full_3D.svg';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
  width: 100vw;
  height: 100vh;
  background-image: url(${BeMine3D});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%) rotate(-30deg);
  opacity: 0.7;

  /* SVG 렌더링 최적화 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
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