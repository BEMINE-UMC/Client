import styled from "styled-components";

export const CardContainer = styled.div`
  width: 380px;
  height: 300px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 200px;
  }
`;

export const ImageSection = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 70%;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const ContentSection = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;

  
`;

export const Author = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0 0 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;

  @media (max-width: 480px) {
    max-width: 200px;
    font-size: 14px;
    white-space: nowrap; /* 텍스트를 한 줄로 유지 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 넘치는 부분에 ... 표시 */
  }
`;

export const LikeSection = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향으로 콘텐츠 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
`;

interface LikeButtonProps {
  liked: boolean; // liked 속성 추가
}

export const LikeButton = styled.button<LikeButtonProps>`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.liked ? "#ff6347" : "#ccc")};
  font-size: 24px;

  &:hover {
    color: #ff0000;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const LikeCount = styled.span`
  font-size: 15px;
  color: #555;
  margin-top: 5px;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;

  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0.5px;
  }
  
`;