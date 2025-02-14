import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { CardContainer, ImageSection, ContentSection, Description, Author, Title, LikeSection, LikeButton, LikeCount, Badge } from "./TemplateCard.styles";
import Empty from "../../../assets/images/main/Empty.png";
import { useTemplateStore } from "../../../store/template/templateStore";

import Badge_D from "../../../assets/images/template/Badge_D.svg";
import Badge_C from "../../../assets/images/template/Badge_C.svg";
import Badge_U from "../../../assets/images/template/Badge_U.svg";


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

  surveyCountDesign: number;  // 인증 뱃지
  surveyCountCredible: number; // 식에 넣어야 함 (디자인 완성 후) 
  surveyCountUseful: number;  // 식에 넣어야함 (디자인 완성 후)
}

interface TemplateCardProps {
  data: TemplateCardData;
  isLoggedIn: boolean;
  onCardClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ data, onCardClick, isLoggedIn }) => {
  const { templateId, title, authorName, thumbnail, likedStatus = false, likeCount = 0, surveyCountDesign, surveyCountCredible, surveyCountUseful } = data;
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
      {surveyCountDesign > 0 && <Badge><img src={Badge_D} alt="Design Badge" /></Badge>}
      {surveyCountCredible > 0 && <Badge><img src={Badge_C} alt="Credible Badge" /></Badge>}
      {surveyCountUseful > 0 && <Badge><img src={Badge_U} alt="Useful Badge" /></Badge>}  
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