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
  }
`;

export const ImageSection = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 70%;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ContentSection = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Author = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0 0 4px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

export const LikeSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
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
`;

export const LikeCount = styled.span`
  font-size: 14px;
  color: #555;
  margin-left: 8px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;