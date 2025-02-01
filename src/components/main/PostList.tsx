import React, { useEffect, useState } from "react";
import PostCard from "./postcard/PostCard";
import PostModal from "../modal/post/PostModal";
import { getImageOrDefault } from "../../utils/imageUtils";
import styled from "styled-components";
import { usePostStore } from "../../store/main/postStore";
import { Post } from "./type/Post";


interface PostListProps {
  selectedCategory: string;
}

const PostList: React.FC<PostListProps> = ({ selectedCategory }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { posts , fetchPosts } = usePostStore();

  useEffect(() => {
    const categoryId = selectedCategory === "전체" ? undefined : Number(selectedCategory);
    console.log("📡 게시물 불러오기 요청:", categoryId);
    fetchPosts(categoryId);
  }, [selectedCategory, fetchPosts]);

  useEffect(() => {
    console.log("✅ 불러온 게시물 데이터:", posts);
  }, [posts]);

  const openModal = (post: Post) => { // 수정: 타입 any 추가
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <PostListWrapper>
      <PostCardContainer>
        {posts.map((post) => (
          <PostCard
            key={post.postId}
            data={{
              ...post,
              thumbnail: getImageOrDefault(post.thumbnail),
              liked: post.likedStatus || false, // 수정: likedStatus를 기본 false로 설정
              likesCount: post.likesCount || 0, // 수정: likesCount 기본값 설정
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
            thumbnail: getImageOrDefault(selectedPost.thumbnail),
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
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  margin-left: 3%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    margin-left: 0px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-left: 0px;
  }
`;