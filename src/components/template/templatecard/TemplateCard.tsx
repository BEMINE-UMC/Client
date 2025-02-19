import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { CardContainer, ImageSection, ContentSection, Description, Author, Title, LikeSection, LikeButton, LikeCount, Badge } from "./TemplateCard.styles";
import Empty from "../../../assets/images/main/Empty.png";
import { useTemplateStore } from "../../../store/template/templateStore";

import Badge_D from "../../../assets/images/template/Badge_D.svg";
import Badge_C from "../../../assets/images/template/Badge_C.svg";
import Badge_U from "../../../assets/images/template/Badge_U.svg";

//디자인 & 신뢰성
import Badge_CD from "../../../assets/images/template/Badge_C&D.svg";
//유용성 & 신뢰성
import Badge_UC from "../../../assets/images/template/Badge_U&C.svg";
//디자인 & 유용성
import Badge_DU from "../../../assets/images/template/Badge_D&U.svg";

//3개 
import Badge_DCU from "../../../assets/images/template/Badge_D&C&U.svg";

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(likedStatus);
  const [likes, setLikes] = useState<number>(likeCount);

  const getBadgeImage = () => {
    if (surveyCountDesign > 0 && surveyCountCredible > 0 && surveyCountUseful > 0) {
      return Badge_DCU; // 세 개 다 0 이상일 때
    }

    // 2개 속성 중복
    if (surveyCountDesign > 0 && surveyCountCredible > 0) {
      return Badge_CD; // Design & Useful만 0 이상일 때
    }

    if (surveyCountCredible > 0 && surveyCountUseful > 0) {
      return Badge_UC;
    }

    if (surveyCountDesign > 0 && surveyCountUseful > 0) {
      return Badge_DU; // Design & Useful만 0 이상일 때
    }

    //1개 속성
    if (surveyCountDesign > 0) {
      return Badge_D;
    }
    if (surveyCountCredible > 0) {
      return Badge_C;
    }
    if (surveyCountUseful > 0) {
      return Badge_U;
    }
    return null;
  }

  const badgeImage = getBadgeImage();

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

  const handleCardClick = () => {
    if(!isLoggedIn) {
      navigate("/login");
      return;
    }
    onCardClick();
  };

  return (
    <CardContainer onClick={handleCardClick} style={{ cursor: "pointer" }}>
      
      {badgeImage && <Badge><img src={badgeImage} alt="Badge" /></Badge>}

      <ImageSection style={{ backgroundImage: `url(${thumbnail || Empty})` }} />
      <ContentSection>
        <Description>
          <Author>{authorName}</Author>
          <Title>{title}</Title>
        </Description>
        <LikeSection>
        <LikeButton
          onClick={isLoggedIn ? handleLike : undefined}
          liked={isLiked}
          disabled={!isLoggedIn}
        >
          {isLiked ? <AiFillHeart className="liked" /> : <AiFillHeart className="not-liked" />}
        </LikeButton>
        <LikeCount>{likes}</LikeCount>
        </LikeSection>
      </ContentSection>
    </CardContainer>
  );
};

export default TemplateCard;