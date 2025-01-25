import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 5rem);
  overflow: hidden;
`;

export const SvgBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/path-to-your-svg-image.svg") no-repeat center center;
  background-size: cover;
  z-index: 1;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #6a6a6a 100%, #ffffff 70%);
  opacity: 0.7; /* 투명도 조절 */
  z-index: 2;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 3; /* 가장 위에 위치하도록 설정 */
  height: calc(100vh - 5rem);
`;
