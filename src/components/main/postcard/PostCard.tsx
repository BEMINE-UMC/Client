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
  image: string;
  author: string;
  title: string;
  liked: boolean;
  likesCount: number;
}

interface PostCardProps {
  data: PostCardData;
  onCardClick: () => void; // 모달을 열기 위한 클릭 핸들러
}

const PostCard: React.FC<PostCardProps> = ({ data, onCardClick }) => {
  const { image, author, title, liked, likesCount } = data;

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
    <CardContainer onClick={onCardClick} style={{ cursor: "pointer" }}>
      <ImageSection image={image} />
      <BookmarkContainer onClick={(e) => {
        e.stopPropagation(); // 북마크 클릭 시 부모의 onClick이 동작하지 않도록 막기
        toggleBookmark();
      }}>
        {isBookmarked ? (
          <BsBookmarkFill className="bookmarked" />
        ) : (
          <BsBookmarkFill className="not-bookmarked" /> // 채워진 아이콘 사용
        )}
      </BookmarkContainer>
      <ContentSection>
        <Box>
          <Author>{author}</Author>
          <Description>{title}</Description>
        </Box>
        <LikeContainer>
          <LikeButton
            onClick={(e) => {
              e.stopPropagation(); // 좋아요 버튼 클릭 시 부모의 onClick이 동작하지 않도록 막기
              toggleLike();
            }}
          >
            {isLiked ? <AiFillHeart className="liked" /> : <AiOutlineHeart className="not-liked" />}
          </LikeButton>
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ContentSection>
    </CardContainer>
  );
};

export default PostCard;