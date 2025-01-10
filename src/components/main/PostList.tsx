import React, { useState } from "react";
import PostCard from "./postcard/PostCard";
import PostModal from "../modal/post/PostModal";
import { getImageOrDefault } from "../../utils/imageUtils"; // 유틸 함수
import { postMockData, Post } from "../modal/post/postMockData";

interface PostListProps {
  selectedCategory: string;
}

const PostList: React.FC<PostListProps> = ({ selectedCategory }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  // 카테고리에 따른 필터링
  const filteredData =
    selectedCategory === "전체"
      ? postMockData
      : postMockData.filter((post) => post.category === selectedCategory);

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {filteredData.map((post) => (
        <PostCard
          key={post.id}
          data={{
            ...post,
            image: getImageOrDefault(post.image), // 이미지 유틸 함수 적용
          }}
          onCardClick={() => openModal(post)}
        />
      ))}

      {isModalOpen && selectedPost && (
        <PostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={{
            ...selectedPost,
            image: getImageOrDefault(selectedPost.image), // 이미지 유틸 함수 적용
          }}
        />
      )}
    </div>
  );
};

export default PostList;