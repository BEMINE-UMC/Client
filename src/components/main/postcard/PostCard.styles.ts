import styled from "styled-components";

export const CardContainer = styled.div`
  width: 16vw; /* 기본 너비 */
  aspect-ratio: 9 / 11 ; /* 가로 세로 비율 유지 */
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  position: relative;
  font-family: Arial, sans-serif;
  transition: box-shadow 0.3s ease;
  margin-bottom: 5%;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) { /* 태블릿 */
    width: 21vw;
  }

  @media (max-width: 480px) { /* 모바일 (375px 기준) */
    width: 40vw;
  }

  @media (max-width: 376px) { /* 작은 모바일 */
    width: 45vw;
  }

  @media (max-width: 321px) { /* 초소형 모바일 */
    width: 50vw;
  }
`;

export const ImageSection = styled.div<{ image: string }>`
  width: 82.5%;
  height: 65%;
  border-radius: 12px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  margin: 12px auto 0;
  margin-top: 10%;

  @media (max-width: 480px) {
    width: 85%;
    height: 65%;
  }
`;

export const ContentSection = styled.div`
  padding: 12px;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  @media (max-width: 768px) {
       height: 35%;
  }

  @media (max-width: 480px) {
    margin-top: 5%;
  }
`;

export const Box = styled.div`
  @media (max-width: 768px) {
    margin-top: -20%;
  }

  @media (max-width: 480px) {
    margin-bottom: 15%;
  }
`;

export const Author = styled.p`
  font-size: 15px;
  color: #555;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const Description = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.4;
  font-weight: bold;
  margin-bottom: 10%;
  

  @media (max-width: 768px) {
    font-size: 16px;
    display: -webkit-box; /* 플렉스 기반 레이아웃 */
    -webkit-line-clamp: 1; /* 표시할 줄 수 */
    -webkit-box-orient: vertical; /* 수직 방향으로 정렬 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
   
  }

  @media (max-width: 480px) {
    font-size: 14px;
    display: -webkit-box; /* 플렉스 기반 레이아웃 */
    -webkit-line-clamp: 1; /* 표시할 줄 수 */
    -webkit-box-orient: vertical; /* 수직 방향으로 정렬 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
   
  }
`;

export const LikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  margin-top: -10%;

  @media (max-width: 768px) {
    margin-top: -20%;
    gap: 5px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20%;
   
  }
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: clamp(24px, 2vw, 32px); /* 최소 24px, 최대 32px, 화면 너비에 따라 조정 */
  display: flex;
  align-items: center;

  .liked {
    color: red;
  }

  .not-liked {
    color: #ccc;

    &:hover {
      color: red;
    }
  } 
  
  @media (max-width: 768px) {
    font-size: 24px;
   
  }

  @media (max-width: 480px) {
    font-size: 25px;
   
  }
`;

export const LikeCount = styled.span`
  font-size: clamp(12px, 1.5vw, 16px); /* 최소 12px, 최대 16px, 화면 너비에 따라 조정 */
  color: #777;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;
  margin-bottom: 10%;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: -5px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const BookmarkContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 8px;
  cursor: pointer;
  font-size: 45px;
  color: #ccc;
  transition: all 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 기본 그림자 효과 */

  .bookmarked {
    color: gold;
  }

  .not-bookmarked {
    color: #ccc;
    &:hover {
      color: gold;
      text-shadow: 2px 2px 6px rgba(255, 215, 0, 0.6); /* 호버 시 강조 */
    }
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
  }
`;