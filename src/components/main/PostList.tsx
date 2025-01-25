import React, { useState } from "react";
import PostCard from "./postcard/PostCard";
import PostModal from "../modal/post/PostModal";
import { getImageOrDefault } from "../../utils/imageUtils"; // 유틸 함수
import { postMockData, Post } from "../modal/post/postMockData";

import styled from "styled-components";

interface PostListProps {
  selectedCategory: string;
}

const PostList: React.FC<PostListProps> = ({ selectedCategory }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const filteredData =
    selectedCategory === "전체"
      ? postMockData
      : postMockData.filter((post) => post.category === selectedCategory);

  return (
    <PostListWrapper>
      <PostCardContainer>
        {filteredData.map((post) => (
          <PostCard
            key={post.id}
            data={{
              ...post,
              image: getImageOrDefault(post.image), // 기본 이미지 유틸 함수 적용
            }}
            onCardClick={() => openModal(post)}
          />
        ))}
      </PostCardContainer>

      {isModalOpen && selectedPost && (
        <PostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={{
            ...selectedPost,
            image: getImageOrDefault(selectedPost.image), // 기본 이미지 유틸 함수 적용
          }}
        />
      )}
    </PostListWrapper>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  display: flex;
  justify-content: center; 
  width: 100%;

`;

const PostCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 모바일: 한 줄에 2장 */
  justify-content: center; /* 가로 중앙 정렬 */
  gap: 3%; /* 카드 간 간격 */
  width: 100%; 
  padding: 10px;
  margin-right: 5%;

  @media (max-width: 480px) { 
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 모바일: 한 줄에 2장 */
    gap: 30px; /* 모바일에서 간격을 조금 더 좁게 */
    margin-left: 7%
  
  }
`;