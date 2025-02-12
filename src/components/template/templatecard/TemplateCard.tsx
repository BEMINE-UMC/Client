import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { CardContainer, ImageSection, ContentSection, Description, Author, Title, LikeSection, LikeButton, LikeCount, Badge } from "./TemplateCard.styles";
import Empty from "../../../assets/images/main/Empty.png";
import { useTemplateStore } from "../../../store/template/templateStore";

import BadgeSVG from "../../../assets/images/template/Badge.svg"; // Badge.svg 경로로 불러오기

interface TemplateCardData {
  templateId: number;
  title: string;
  authorId: number;
  authorName: string;
  thumbnail?: string;
  likedStatus?: boolean;
  likeCount?: number;
  categoryId: number;
  categoryName: string;
  surveyCount: number; // ✅ 추가된 필드 전달
}

interface TemplateCardProps {
  data: TemplateCardData;
  isLoggedIn: boolean;
  onCardClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ data, onCardClick, isLoggedIn }) => {
  const { templateId, title, authorName, thumbnail, likedStatus = false, likeCount = 0, surveyCount } = data;
  const { likeTemplate } = useTemplateStore();

  const [isLiked, setIsLiked] = useState<boolean>(likedStatus);
  const [likes, setLikes] = useState<number>(likeCount);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    const updatedLikeStatus = !isLiked;
    setIsLiked(updatedLikeStatus);
    setLikes((prev) => (updatedLikeStatus ? prev + 1 : prev - 1));

    await likeTemplate(templateId);
  };

  return (
    <CardContainer onClick={onCardClick} style={{ cursor: "pointer" }}>
      {surveyCount > 0 && <Badge><img src={BadgeSVG} alt="Badge" /></Badge>} {/* SVG 이미지로 Badge 표시 */}
      <ImageSection style={{ backgroundImage: `url(${thumbnail || Empty})` }} />
      <ContentSection>
        <Description>
          <Author>{authorName}</Author>
          <Title>{title}</Title>
        </Description>
        <LikeSection>
          {isLoggedIn ? (
            <LikeButton onClick={handleLike} liked={isLiked}>
              {isLiked ? <AiFillHeart className="liked" /> : <AiFillHeart className="not-liked" />}
            </LikeButton>
          ) : null}
          <LikeCount>{likes}</LikeCount>
        </LikeSection>
      </ContentSection>
    </CardContainer>
  );
};

export default TemplateCard;