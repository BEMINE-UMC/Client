import styled from "styled-components";

export const Container = styled.div`
  align-items: center;  /* 세로 방향으로 내용 중앙 정렬 */
  justify-content: center;  /* 가로 방향으로 내용 중앙 정렬 */
  gap: 10px;
  position: relative;
  width: 95%;
  margin: 40px 0;
  overflow: visible; /* 부모 요소에서 overflow를 visible로 유지 */
`;

export const BannerContainer = styled.div`
  display: flex;
  align-items: center;  /* 세로 방향 정렬 */
  justify-content: center;  /* 가로 방향 정렬 */
  gap: 30px;
  width: 100%;
  height: 100%;
  overflow: visible; /* 콘텐츠가 잘리지 않도록 설정 */
  padding: 0 40px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;

export const BannerItem = styled.div`
  width: 530px;
  height: 380px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden; 
  position: relative;
  display: flex;
  align-items: center;  /* 세로 중앙 정렬 */
  justify-content: center;  /* 가로 중앙 정렬 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;


export const Image = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.backgroundImage});
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
`;


export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;


export const Author = styled.p`
  font-size: 16px;
  margin: 4px 0 0;
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
    left: 30px;
  }

  &:last-of-type {
    right: -50px; /* 오른쪽 버튼 위치 수정 */
  }
`;