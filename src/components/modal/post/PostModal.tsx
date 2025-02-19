import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Post } from "../../main/type/Post";

import UserSection from "./UserSection";
import ContentSection from "./ContentSection";
import FooterSection from "./FooterSection";
import { PostDetail } from "../../main/type/PostDetail";
import Bar from "./Bar";

import { useOtherPostsStore } from "../../../store/main/otherPostStore";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Post | PostDetail | null;
  onLikeClick: () => void;  
  liked: boolean;  
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, data, onLikeClick, liked }) => {
  if (!isOpen || !data) return null;

  const postDetail = data as PostDetail;

  const [likedStatus, setLikedStatus] = useState(liked);

  const { posts: otherPosts, fetchOtherPosts } = useOtherPostsStore();

  useEffect(() => {
    if (data) {
      console.log("✅ PostModal 내부 postDetail 업데이트:", data);
      fetchOtherPosts(String(data.postId)); //postId 기반으로 데이터 가져오기
    }
  }, [data, fetchOtherPosts]);
  

  const handleLikeClick = () => {
    setLikedStatus((prev) => !prev);
    onLikeClick();
    console.log("👍 좋아요 상태 변경:", !likedStatus);
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* <CloseButton onClick={onClose}>&times;</CloseButton> */}
        
        <Bar onBackClick={handleBackClick} />
        
        <UserSection
          userImage={data.userImage || ""}  
          author={data.authorName}  
          userInformation={data.userInformation || ""}  
        />
        <ContentSection
          title={data.title}
          content={postDetail.body || ""} 
          liked={likedStatus}
          onLikeClick={handleLikeClick} 
      />
        <FooterSection
          author={data.authorName}
          contentImage={data.thumbnail}  // contentImage를 thumbnail로 변경
          // otherPosts={otherPosts} // !여기부터! 
        />
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  @media (max-width: 768px) {
    justify-content: center;
    width: min(100vw, 100%); 
    background-color: white;
    height: 100vh; /* ✅ 모바일에서도 꽉 차도록 수정 */
  }

  @media (max-width: 480px) {
    justify-content: center;
    width: min(100vw, 100%); 
    height: 100%;
    width: 105vw;
    max-width: 480px;
    height: 120vh; 
    overflow: hidden; /* ✅ 스크롤 방지 */
  }
`;

const ModalContent = styled.div`
  background: #fff;
  width: 110%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.01);
    width: min(100vw, 50%);
    height: auto;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    width: 90%; /* ✅ 모바일에서 적절한 크기 유지 */
    padding: 10px; /* ✅ 내부 간격을 줄여 공간 활용 개선 */
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1); /* ✅ 모바일에서도 배경과 구분되도록 수정 */
    overflow: hidden; /* ✅ 내부 스크롤도 방지 */
  }
`;

