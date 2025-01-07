import React from "react";
import styled from "styled-components";

interface PostCardData {
  image: string;
  author: string;
  description: string;
  liked: boolean;
}

interface PostCardProps {
  data: PostCardData;
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const { image, author, description, liked } = data;

  return (
    <CardContainer>

      <ImageSection style={{ backgroundImage: `url(${image})` }} />
      <ContentSection>
        <Author>{author}</Author>
        <Description>{description}</Description>
      </ContentSection>
      <LikeButton liked={liked}>❤️</LikeButton>
    </CardContainer>
  );
};

export default PostCard;


const CardContainer = styled.div`
  width: 250px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  position: relative;
  font-family: Arial, sans-serif;
`;

const ImageSection = styled.div`
  width: 100%;
  height: 150px;
  background-size: cover;
  background-position: center;
`;


const ContentSection = styled.div`
  padding: 16px;
`;


const Author = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin: 0 0 8px;
`;


const Description = styled.p`
  font-size: 12px;
  color: #777;
  margin: 0;
`;


interface LikeButtonProps {
  liked: boolean;
}

const LikeButton = styled.button<LikeButtonProps>`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${(props) => (props.liked ? "red" : "#ccc")};
  transition: color 0.3s;

  &:hover {
    color: red;
  }
`;