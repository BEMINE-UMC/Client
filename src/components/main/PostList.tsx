import React from "react";
import PostCard from "./postcard/PostCard";
import { getImageOrDefault } from "../../utils/imageUtils";
import { postMockData, Post } from "../../mock/postMockData";

interface PostListProps {
  selectedCategory: string;
}

const PostList: React.FC<PostListProps> = ({ selectedCategory }) => {
  const filteredData: Post[] =
    selectedCategory === "전체"
      ? postMockData
      : postMockData.filter((post) => post.category === selectedCategory);

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {filteredData.map((post, index) => (
        <PostCard
          key={index}
          data={{
            ...post,
            image: getImageOrDefault(post.image), // 유틸리티 함수 사용
          }}
        />
      ))}
    </div>
  );
};

export default PostList;