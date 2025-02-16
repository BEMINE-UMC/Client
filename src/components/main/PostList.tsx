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

    const [likedStatus, setLikedStatus] = useState<{ [key: number]: boolean }>({}); // ✅ 수정됨: 좋아요 상태 관리
    
    const { posts , fetchPosts } = usePostStore();
    
    const { fetchPostDetail, postDetail } =usePostDetailStore();

    const {isLoggedIn} = useAuthStore();

    const categoryMap: Record<string, number> = {
      "콘텐츠 마케터": 1,
      "브랜드 마케터": 2,
      "퍼포먼스 마케터": 3,
      "바이럴 마케터": 4,
    };

    const categoryId = selectedCategory === "전체" ? undefined : categoryMap[selectedCategory];

    const fetchCategoryPosts = useCallback(() => {
      console.log("📡 선택된 카테고리:", selectedCategory);
      console.log("📡 변환된 categoryId:", categoryId);
    
      if (categoryId !== undefined) {
        fetchPosts(categoryId);
      } else {
        fetchPosts(); // 전체 게시물을 가져오는 기본 API 엔드포인트를 호출
      }
    }, [selectedCategory, fetchPosts]);
    useEffect(() => {
      fetchCategoryPosts();
    }, [fetchCategoryPosts, selectedCategory]); // 변경될 때 마다 실행

    useEffect(() => {
      console.log("✅ 불러온 게시물 데이터:", posts);
    }, [posts]);

    const openModal = async (post: Post) => { 
      setSelectedPost(post);
      setIsModalOpen(true);
      await fetchPostDetail(post.postId);
    };

    const closeModal = () => {
      setSelectedPost(null);
      setIsModalOpen(false);
    };

    const handleLikeClick = (postId: number) => {
      setLikedStatus((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
      console.log(`👍 Post ${postId} 좋아요 상태 변경:`, !likedStatus[postId]);
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
                likesCount: post.likesCount || 0, 
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
              ...postDetail, // 상세 정보 받아오기              
              ...selectedPost,
            }}
            onLikeClick={() => handleLikeClick(selectedPost.postId)} // ✅ 수정됨: 좋아요 클릭 핸들러 전달
          liked={likedStatus[selectedPost.postId] || false} // ✅ 수정됨: liked 상태 전달
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
    grid-template-columns: repeat(5, minmax(200px, 1fr)); 
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 10px;
    margin-left: 3%;

    @media (max-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
      margin-left: -3%;
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);

      margin-left: 0px;
    }
  `;