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
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈 */
  justify-content: center; /* 가로 중앙 정렬 */
  gap: 2.5%; /* 카드 간 간격 */
  width: 100%; 
  padding: 10px;
  margin-right: 5%;
`;