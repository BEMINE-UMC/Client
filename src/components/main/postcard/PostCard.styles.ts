import styled from "styled-components";

export const CardContainer = styled.div`
  width: 300px; /* 원래 크기의 1.25배 */
  height: 380px; /* 원래 크기의 1.25배 */
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

  @media (max-width: 480px) {
    width: 185px;
    height: 220px;
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

  @media (max-width: 480px) {
    width: 85%;
    height: 65%;
  }
`;

export const ContentSection = styled.div`
  padding: 12px;
  height: 35%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  @media (max-width: 480px) {
    margin-bottom: 10px;;
   
  }
`;

export const Box = styled.div`
  @media (max-width: 480px) {
    margin-bottom: 15%;
  }
`;

export const Author = styled.p`
  font-size: 15px;
  color: #555;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const Description = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.4;
  font-weight: bold;
  

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
  gap: 7px;

  @media (max-width: 480px) {
    margin-bottom: 20%;
   
  }
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 35px;
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

  @media (max-width: 480px) {
    font-size: 25px;
   
  }
`;

export const LikeCount = styled.span`
  font-size: 16px;
  color: #777;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;
  margin-bottom: 10%;

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

  .bookmarked {
    color: gold;
  }

  .not-bookmarked {
    color: #ccc;
    &:hover {
      color: gold;
    }
  }

  @media (max-width: 480px) {
    font-size: 40px;
  }
`;