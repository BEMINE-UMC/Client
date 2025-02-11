import styled from "styled-components";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import CustomColumn from "../components/CustomColumn";
import CustomFont from "../components/CustomFont";
import CustomBox from "../components/CustomBox";
import StyledImg from "../components/StyledImg";
import CustomButton from "../components/CustomButton";

// 스타일 코드 하단 분리 

const Likes = () => {
  // const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [imageList, setImageList] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  // 좋아요 누른 게시물 조회 API 요청 함수 
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/myPage/likePost`, {
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          const posts: { postId: number; url: string }[] = response.data.success.post;
          if (posts.length > 0) {
            setImageList(posts.map((post) => post.url));
            setMessage("");
          } else {
            setImageList([]);
            setMessage("좋아요 누른 게시물이 아직 없어요.");
          }
        }
      } catch (error) {
        console.error("Error fetching liked posts:", error);
        setImageList([]);
        setMessage("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchLikedPosts();
  }, [accessToken]);

  return (
    <ResponsiveColumn>
      <CustomColumn $height="1vh"></CustomColumn>
      <CustomFont $color="black" $font="0.9rem" $fontweight="bold">
        좋아요 누른 템플릿
      </CustomFont>

      <ResponsiveBox>
        {imageList.length > 0 ? (
          imageList.map((src, index) => (
            <CustomButton
              key={index}
              $width="100%"
              $height="auto"
              $padding="0"
              $backgroundColor="transparent"
            >
              <ResponsiveImg src={src} />
            </CustomButton>
          ))
        ) : (
          <CustomFont $color='gray' $font='1rem'>{message}</CustomFont>
        )}
      </ResponsiveBox>
    </ResponsiveColumn>
  );
};

export default Likes;

const ResponsiveColumn = styled(CustomColumn)`
  width: 25%;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    width: 80%;
    min-height: auto;
  }

  @media (max-width: 768px) {
    width: 90%;
    min-height: auto;
  }
`;

const ResponsiveImg = styled(StyledImg)`
  width: 100%;

  @media (max-width: 768px) {
    border-radius: 0.5rem;
  }
`;

const ResponsiveBox = styled(CustomBox)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 80%;
  height: auto;
  padding: 0.5rem;
  background-color: transparent;
  border: 1.5px solid #d9d9d9;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  @media (max-width: 1024px) {
    width: 90%;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 0.8rem;
  }
`;
