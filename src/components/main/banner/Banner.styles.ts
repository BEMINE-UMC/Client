import styled from "styled-components";

export const Container = styled.div`
  position: relative; /* 자식 요소 기준 포지셔닝 */
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: min(100vw, 95%); /* 화면 크기에 맞게 조정 */
  margin: 3.5% 0 3.5% 2%;
  overflow: visible;

  @media (max-width: 768px) {
    width: 100%;
    margin: 20px 0 20px 0;
  }
`;

export const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: max(100vw, 150%); /* 가로 스크롤 허용 */
  height: 100%;
  padding: 0 40px;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }

  @media (max-width: 768px) {
    min-width: 100vw;
    width: fit-content;
    gap: 10px;
  }
`;

export const BannerItem = styled.div`
  width: clamp(250px, 60%, 500px);  /* 최소 250px, 최대 500px, 기본 60% */
  height: clamp(150px, 35vw, 300px); /* 최소 150px, 최대 300px, 기본 35% of viewport width */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  @media (max-width: 768px) {
    width: clamp(200px, 70%, 400px);  /* 더 작은 화면에서는 70%로 설정 */
    height: clamp(150px, 30vw, 250px);
  }

  @media (max-width: 480px) {
    width: clamp(150px, 80%, 350px);  /* 더 작은 화면에서는 80%로 설정 */
    height: clamp(150px, 25vw, 200px);
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
  color: white; /* 기본 색상 지정 */
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
    right: 40px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
