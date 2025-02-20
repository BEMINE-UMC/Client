import React from "react";
import styled from "styled-components";

import Empty from "../../../assets/images/main/Empty.png"

interface OtherPost {
  userId: number;
  postId: number;
  title: string;
  picture: string;
}

interface FooterProps {
  author: string;
  contentImage?: string; // 이미지가 없을 수도 있음
  otherPosts: OtherPost[]; // ✅ 추가: 다른 게시물 목록을 props로 받음
  onOtherPostClick: (postId: number) => void; // 부모에게 전달할 함수
}

const FooterSection: React.FC<FooterProps> = ({ author, contentImage, otherPosts, onOtherPostClick }) => {
  // const imageSrc = contentImage || Empty;
  
  return (
    <>
        <Container>
            <Header>
                <Author>{author}가 작성한 다른 게시물</Author>
            </Header>
        
            {/* ✅ otherPosts 데이터가 있을 경우 렌더링 */}
            {otherPosts.length > 0 ? (
              <OtherPostsContainer>
                {otherPosts.map((post) => (
                  <OtherPostItem key={post.postId} onClick={() => onOtherPostClick(post.postId)}>
                    <StyledImage src={post.picture} alt={post.title} />
                    <PostTitle>{post.title}</PostTitle>
                  </OtherPostItem>
                ))}
              </OtherPostsContainer>
            ) : (
              <NoOtherPosts>작성한 다른 게시물이 없습니다.</NoOtherPosts>
            )}

        </Container>
    </>
  );
};

export default FooterSection;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* 요소를 세로로 나열 */
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  justify-content: center;
  align-items: center; /* 수평 중앙 정렬 */
  gap: 20px;

  @media (max-width: 480px) {
    padding: 10px;
    gap: 15px;
  }
`;

const Header = styled.div`

  
  margin-bottom: 15px;
`;

const Author = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 12.5px;
  }
`;



const StyledImage = styled.img.attrs<{ src?: string }>(props => ({
  src: props.src && props.src.trim() !== "" ? props.src : Empty
}))`
  width: 10vw;
  height: auto;
  object-fit: cover;
  border-radius: 100px; /* 더 둥글게 설정 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 애니메이션 추가 */
  overflow: visible;

  &:hover {
    transform: scale(1.05); /* 이미지 확대 */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  }

  @media (max-width: 768px) {
    
    border-radius: 20px;
    justify-content: center;
  }

  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;

const OtherPostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 100px;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-wrap: nowrap; /* ✅ 가로로 나열 */
    gap: 10%;
  }
`;

const OtherPostItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  text-align: center;
  cursor: pointer;

  border-radius: 100px;

  @media (max-width: 480px) {
    width: 100px;
  }
`;

const PostTitle = styled.p`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const NoOtherPosts = styled.p`
  font-size: 16px;
  color: #999;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;