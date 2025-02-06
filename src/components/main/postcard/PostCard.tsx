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

  // const toggleLike = (e: React.MouseEvent) => { // 수정: 이벤트 타입 추가
  //   e.stopPropagation();
  //   if (!isLoggedIn) return; // 로그인 안 되어 있으면 클릭 무시
  //   setIsLiked((prev) => !prev);
  //   setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  // };

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

  // const toggleBookmark = (e: React.MouseEvent) => { // 수정: 이벤트 타입 추가
  //   e.stopPropagation();
  //   if (!isLoggedIn) return; // 로그인 안되어 있을 시 클릭 무시 
  //   setIsBookmarked((prev) => !prev);
  // };

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
              {isLiked ? <AiFillHeart className="liked" /> : <AiOutlineHeart className="not-liked" />}
            </LikeButton>
          ) : (
            <LikeButton style={{ opacity: 0.5, cursor: "not-allowed" }}>
              <AiOutlineHeart className="not-liked" />
            </LikeButton>
          )}
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ContentSection>
    </CardContainer>
  );
};

export default PostCard;