import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  CardContainer,
  ImageSection,
  ContentSection,
  Description,
  Author,
  Title,
  LikeSection,
  LikeButton,
  LikeCount,
} from "./TemplateCard.styles";

interface TemplateCardProps {
  title: string;
  author: string;
  image: string;
  liked: boolean;
  likesCount: number;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  author,
  image,
  liked,
  likesCount,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likesCount);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <CardContainer>
      <ImageSection backgroundImage={image} />
      <ContentSection>
        <Description>
          <Author>{author}</Author>
          <Title>{title}</Title>
        </Description>
        <LikeSection>
          <LikeButton onClick={toggleLike}>
            {isLiked ? <AiFillHeart className="liked" /> : <AiOutlineHeart className="not-liked" />}
          </LikeButton>
          <LikeCount>{likeCount}</LikeCount>
        </LikeSection>
      </ContentSection>
    </CardContainer>
  );
};

export default TemplateCard;