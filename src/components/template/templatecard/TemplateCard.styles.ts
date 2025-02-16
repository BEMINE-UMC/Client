import styled from "styled-components";

export const Badge = styled.span`
  position: absolute;
  top: -30px;  /* 카드 영역 위로 벗어나게 */
  left: -20px;
  z-index: 10;  /* 다른 요소들보다 위에 표시되도록 설정 */

  img {
    width: 125px;  /* 원하는 크기로 설정 */
    height: auto;

    @media (max-width: 768px) {
      top: -20px;
      width: 80px;
    }

    @media (max-width: 480px) {
      top: 0px;
      width: 70px;
    }
  }
`;

export const CardContainer = styled.div`
  position: relative;  /* Badge가 상대적으로 위치할 수 있도록 설정 */
  width: 21vw;
  aspect-ratio: 11 / 8 ; /* 가로 세로 비율 유지 */
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: visible;
  background-color: white;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 20vw;
    height: calc(20.5vw * 1.3); /* width에 비례한 height 조정 */
  }

  @media (max-width: 480px) {
    width: 38vw;
    height: 200px;
  }

  @media (max-width: 375px) {
    width: 38vw;
    height: 160px;
  }

  @media (max-width: 320px) {
    width: 36vw;
    height: 120px;
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  height: 70%;  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    border-radius: 12px;
    width: 90%;
    margin: 10px auto; /* 모바일에서도 중앙 정렬 */
    margin-bottom: -10px;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
    font-size: 12px;
    width: 90%;
    margin: 10px auto; /* 모바일에서도 중앙 정렬 */
    margin-bottom: -10px;
  }
`;

export const ContentSection = styled.div`
  display: flex;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  
  @media (max-width: 768px) {
    margin-top: -10%;
  }

  @media (max-width: 480px) {
    margin-top: 3%;
  }

  @media (max-width: 320px) {
    margin-top: -20%;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;

  
`;

export const Author = styled.p`
  font-size: clamp(10px, 1.5vw, 14px); /* 최소 10px, 최대 14px */
  color: #777;
  margin: 0 0 4px;
  
`;

export const Title = styled.p`
  font-size: clamp(11px, 2vw, 16px);
  font-weight: bold;
  color: #333;
  margin: 0;
  max-width: clamp(60px, 40vw, 100px); /* 최소 60px, 최대 100px */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LikeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    margin-top: -5%;
  }
`;

interface LikeButtonProps {
  liked: boolean;
}

export const LikeButton = styled.button<LikeButtonProps>`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.liked ? "#ff6347" : "#ccc")};
  font-size: clamp(18px, 2.5vw, 24px); /* 최소 18px, 최대 24px */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ff0000;
  }
`;

export const LikeCount = styled.span`
  font-size: clamp(10px, 1.8vw, 15px); /* 최소 10px, 최대 15px */
  color: #555;
  margin-top: 5px;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;
`;
