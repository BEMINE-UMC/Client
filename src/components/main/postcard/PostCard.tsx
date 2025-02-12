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
import { AiFillHeart } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { usePostStore } from "../../../store/main/postStore";

interface PostCardData {
  postId: number;
  thumbnail: string;
  authorName: string;
  title: string;
  liked: boolean;
  likesCount: number;
}

interface PostCardProps {
  data: PostCardData;
  onCardClick: () => void;
  isLoggedIn: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ data, onCardClick, isLoggedIn }) => {
  const { postId, thumbnail, authorName, title, liked, likesCount } = data;
  const { likePost, scrapPost } = usePostStore();

  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    await likePost(postId);
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  }

  const handleScrap = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    await scrapPost(postId);
    setIsBookmarked((prev) => !prev);
  }

  return (
    <CardContainer onClick={onCardClick} style={{ cursor: "pointer" }}>
      <ImageSection image={thumbnail} />
      {isLoggedIn && (
      <BookmarkContainer onClick={handleScrap}>
        {isBookmarked ? (
          <BsBookmarkFill className="bookmarked" />
        ) : (
          <BsBookmarkFill className="not-bookmarked" />
        )}
      </BookmarkContainer>
      )}
      <ContentSection>
        <Box>
          <Author>{authorName}</Author>
          <Description>{title}</Description>
        </Box>
        <LikeContainer>
        {isLoggedIn ? (
            <LikeButton onClick={handleLike}>
              {isLiked ? <AiFillHeart className="liked" /> : <AiFillHeart className="not-liked" />}
            </LikeButton>
          ) : (
            <LikeButton style={{ opacity: 0.5, cursor: "not-allowed" }}>
              <AiFillHeart className="not-liked" />
            </LikeButton>
          )}
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ContentSection>
    </CardContainer>
  );
};

export default PostCard;