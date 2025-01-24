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
    rgba(255, 255, 255, 1) 0%,
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
  background-size: 150% auto;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%);
`;

const AnimatedBackground = () => {
  console.log('Background image URL:', BeMine3D); // 이미지 경로 확인용
  return (
    <BackgroundContainer>
      <BackgroundImage />
    </BackgroundContainer>
  );
};

export default AnimatedBackground; 