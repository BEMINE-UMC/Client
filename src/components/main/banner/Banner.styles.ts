import styled from "styled-components";

export const Container = styled.div`
  position: relative; /* 자식 요소를 기준으로 한 포지셔닝을 보장 */
  z-index: 1;
  display: flex; /* 요소 정렬을 위해 flex 적용 */
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: min(100vw, 95%); /* 화면 크기에 맞게 자동 조정 */
  margin: 3.5% 0; /* margin-top과 margin-bottom을 통합 */
  margin-left: 2%;

  overflow: visible; /* 자식 요소가 밖으로 나가도 표시되도록 */

  @media (max-width: 768px) {
    width: 100%;
    margin: 20px 0;
    margin-left: 0px;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 20px 0;
    margin-left: 0px;
  }
`;

export const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 왼쪽 정렬로 시작 */
  gap: 30px;
  width: max(100vw, 150%); /* 스크롤 가능한 너비 증가 */
  height: 100%;
  padding: 0 40px;
  scroll-snap-type: x mandatory;
  overflow-x: auto; /* 가로 스크롤 가능 */
  overflow-y: visible; /* 세로 오버플로우 숨김 */
  scroll-behavior: smooth;
  white-space: nowrap; /* 줄바꿈 방지로 가로 정렬 유지 */
  
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }

  @media (max-width: 768px) {
    min-width: 100%; /* 컨테이너가 최소한 화면 크기 유지 */
    gap: 10px;
  }

  @media (max-width: 480px) {
    min-width: 100%; /* 컨테이너가 최소한 화면 크기 유지 */
    gap: 10px;
    padding: 0 10px;
  }
`;

export const BannerItem = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* border-radius 적용을 보장 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.05) rotate(2deg); /* 확대와 살짝 회전 효과 */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* 그림자 강도 증가 */
    background-color: rgba(255, 255, 255, 0.8); /* 배경색 변화 */
  }

  @media (max-width: 768px) {
    width: 350px;
    height: 200px;
    flex-shrink: 0;
    
    &:hover {
      
    }
  }

  @media (max-width: 480px) {
    width: 256px;
    height: 167px;
    flex-shrink: 0;
  }
`;

export const Image = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
`;

export const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  color: #fff;
  display: flex;
  flex-direction: column;
  color: black;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 800;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const Author = styled.p`
  font-size: 16px;
  margin: 4px 0 0;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgb(238, 236, 236);
  }

  svg {
    color: black;
    font-size: 20px;
  }

  &:first-of-type {
    left: 40px;
  }

  &:last-of-type {
    right: 40px; /* 음수값 제거 */
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;