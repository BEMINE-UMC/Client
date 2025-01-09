import React, { useState } from "react";
import {
  CardContainer,
  ImageSection,
  ContentSection,
  Author,
  Description,
  LikeContainer,
  LikeButton,
  LikeCount,
  BookmarkContainer,
} from "./PostCard.styles";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface PostCardData {
  image: string;
  author: string;
  description: string;
  liked: boolean;
  likesCount: number;
}

interface PostCardProps {
  data: PostCardData;
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const { image, author, description, liked, likesCount } = data;

  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <CardContainer>
      <ImageSection image={image} />
      <BookmarkContainer onClick={toggleBookmark}>
        {isBookmarked ? <BsBookmarkFill className="bookmarked" /> : <BsBookmark className="not-bookmarked" />}
      </BookmarkContainer>
      <ContentSection>
        <div>
          <Author>{author}</Author>
          <Description>{description}</Description>
        </div>
        <LikeContainer>
          <LikeButton onClick={toggleLike}>
            {isLiked ? <AiFillHeart className="liked" /> : <AiOutlineHeart className="not-liked" />}
          </LikeButton>
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ContentSection>
    </CardContainer>
  );
};

export default PostCard;