import React, { useEffect, useState } from "react";

import PostModal from "../modal/post/PostModal";
import { getImageOrDefault } from "../../utils/imageUtils";
import styled from "styled-components";
import { useAuthStore } from "../../store/authStore";
import { usePostDetailStore } from "../../store/main/postDetailStore";
import { Post } from "../main/type/Post";
import PostCard from "../main/postcard/PostCard";


interface SearchResultsProps {
  searchResults: Post[];
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, searchTerm }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedStatus, setLikedStatus] = useState<{ [key: number]: boolean }>({});

  const { fetchPostDetail, postDetail } = usePostDetailStore();
  const { isLoggedIn } = useAuthStore();


  const displaySearchTerm = searchTerm?.trim() ? searchTerm : "검색어 없음";

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

  useEffect(() => {
  console.log("🔄 searchTerm 변경됨:", searchTerm);
  }, [searchTerm]);


  return (
    <SearchResultsWrapper>
      <SearchHeader> 🔎 검색 결과</SearchHeader>
      <PostCardContainer>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((post) => (
            <PostCard
              key={post.postId}
              data={{
                ...post,
                thumbnail: getImageOrDefault(post.thumbnail),
                liked: likedStatus[post.postId] || post.likedStatus || false,
                likesCount: post.likesCount || 0,
              }}
              onCardClick={() => openModal(post)}
              isLoggedIn={isLoggedIn}
            />
          ))
        ) : (
          <A>검색 결과가 없습니다.</A>
        )}
      </PostCardContainer>

      {isModalOpen && selectedPost && (
        <PostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={{
            ...postDetail,
            ...selectedPost,
          }}
          onLikeClick={() => handleLikeClick(selectedPost.postId)}
          liked={likedStatus[selectedPost.postId] || false}
        />
      )}
    </SearchResultsWrapper>
  );
};

export default SearchResults;

const SearchResultsWrapper = styled.div`
  margin-top: 3%;
  display: flex;
  justify-content: center;
  flex-direction: column; /* 세로 정렬 */
  width: 100%;
  margin-left: 1%;
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
    margin-left: 2%;
    
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    margin-left: 0px;
  }
`;

const SearchHeader = styled.h2`
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2%;

  margin-left: 3%;
`;

const A = styled.p`
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2%;

  margin-left: 3%;
`;