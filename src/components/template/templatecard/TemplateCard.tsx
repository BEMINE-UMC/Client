import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CardContainer, ImageSection, ContentSection, Description, Author, Title, LikeSection, LikeButton, LikeCount } from "./TemplateCard.styles";
import Empty from "../../../assets/images/main/Empty.png";
import { useTemplateStore } from "../../../store/template/templateStore";

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
}

interface TemplateCardProps {
  data: TemplateCardData;
  isLoggedIn: boolean;
  onCardClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ data, onCardClick, isLoggedIn }) => {
  const { templateId, title, authorName, thumbnail, likedStatus = false, likeCount = 0 } = data;
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
      <ImageSection backgroundImage={thumbnail || Empty} />
      <ContentSection>
        <Description>
          <Author>{authorName}</Author>
          <Title>{title}</Title>
        </Description>
        <LikeSection>
          {isLoggedIn ? (
            <LikeButton onClick={handleLike} liked={isLiked}>
              {isLiked ? <AiFillHeart className="liked" /> : <AiOutlineHeart className="not-liked" />}
            </LikeButton>
          ) : null}
          <LikeCount>{likes}</LikeCount>
        </LikeSection>
      </ContentSection>
    </CardContainer>
  );
};

export default TemplateCard;