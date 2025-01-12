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

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
`;

export const ContentSection = styled.div`
  padding: 12px;
  height: 35%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const Author = styled.p`
  font-size: 15px;
  color: #555;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 18 px;
  color: #333;
  margin: 2px 0 0;
  line-height: 1.4;
  font-weight: bold;
`;

export const LikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
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
`;

export const LikeCount = styled.span`
  font-size: 16px;
  color: #777;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;
  margin-bottom: 10%;
`;

export const BookmarkContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 8px;
  cursor: pointer;
  font-size: 45px;
  color: #ccc;
  opacity: 0;
  transition: all 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }

  .bookmarked {
    color: gold;
  }

  .not-bookmarked {
    color: #ccc;

    &:hover {
      color: gold;
    }
  }
`;