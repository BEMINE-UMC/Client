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
import { useNavigate } from "react-router-dom";
import { usePostActions } from "../../../store/main/postAction";

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
  onLikeClick: (postId: number) => void; // ✅ 추가됨
}

const PostCard: React.FC<PostCardProps> = ({ data, onCardClick, isLoggedIn, onLikeClick }) => {
  const { postId, thumbnail, authorName, title, liked, likesCount } = data;
  const { likePost, scrapPost } = usePostActions();

  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    onLikeClick(postId); // 부모로부터 전달된 onLikeClick 호출  
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleScrap = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    await scrapPost(postId);
    setIsBookmarked((prev) => !prev);
  };

  const handleCardClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    onCardClick();
  };



  return (
    <CardContainer onClick={handleCardClick} style={{ cursor: "pointer" }}>
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