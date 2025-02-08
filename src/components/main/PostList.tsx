  import React, { useCallback, useEffect, useState } from "react";
  import PostCard from "./postcard/PostCard";
  import PostModal from "../modal/post/PostModal";
  import { getImageOrDefault } from "../../utils/imageUtils";
  import styled from "styled-components";
  import { usePostStore } from "../../store/main/postStore";
  import { Post } from "./type/Post";
  import { useAuthStore } from "../../store/authStore";
  import { usePostDetailStore } from "../../store/main/postDetailStore";


  interface PostListProps {
    selectedCategory: string;
  }

  const PostList: React.FC<PostListProps> = ({ selectedCategory }) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { posts , fetchPosts } = usePostStore();
    
    const { fetchPostDetail } =usePostDetailStore();

    const {isLoggedIn} = useAuthStore();

    const fetchCategoryPosts = useCallback(() => {
      const categoryId = selectedCategory === "전체" ? undefined : Number(selectedCategory);
      
      console.log("📡 선택된 카테고리:", selectedCategory);
      console.log("📡 변환된 categoryId:", categoryId);
      
      fetchPosts(categoryId);
    }, [selectedCategory, fetchPosts]);

    useEffect(() => {
      fetchCategoryPosts();
    }, [fetchCategoryPosts]);

    useEffect(() => {
      console.log("✅ 불러온 게시물 데이터:", posts);
    }, [posts]);

    const openModal = async (post: Post) => { // 수정: 타입 any 추가
      setSelectedPost(post);
      setIsModalOpen(true);
      await fetchPostDetail(post.postId);
    };

    const closeModal = () => {
      setSelectedPost(null);
      setIsModalOpen(false);
    };

    return (
      <PostListWrapper>
        <PostCardContainer>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.postId}
              data={{
                ...post,
                thumbnail: getImageOrDefault(post.thumbnail),
                liked: post.likedStatus || false,
                likesCount: post.likesCount || 0, //현재 데이터 베이스에 없는 데이터?
              }}
              onCardClick={() => openModal(post)}
              isLoggedIn={isLoggedIn} // 로그인 상태 전달
            />
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 자동 줄바꿈 */
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