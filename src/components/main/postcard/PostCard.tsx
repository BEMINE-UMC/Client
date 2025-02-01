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
  Box,
} from "./PostCard.styles";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";

interface PostCardData {
  thumbnail: string;
  authorName: string;
  title: string;
  liked: boolean;
  likesCount: number;
}

interface PostCardProps {
  data: PostCardData;
  onCardClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ data, onCardClick }) => {
  const { thumbnail, authorName, title, liked, likesCount } = data;

  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => { // 수정: 이벤트 타입 추가
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const toggleBookmark = (e: React.MouseEvent) => { // 수정: 이벤트 타입 추가
    e.stopPropagation();
    setIsBookmarked((prev) => !prev);
  };

  return (
    <CardContainer onClick={onCardClick} style={{ cursor: "pointer" }}>
      <ImageSection image={thumbnail} />
      <BookmarkContainer onClick={toggleBookmark}>
        {isBookmarked ? (
          <BsBookmarkFill className="bookmarked" />
        ) : (
          <BsBookmarkFill className="not-bookmarked" />
        )}
      </BookmarkContainer>
      <ContentSection>
        <Box>
          <Author>{authorName}</Author>
          <Description>{title}</Description>
        </Box>
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