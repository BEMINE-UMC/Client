
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
  onClick: () => void;
  onLikeToggle: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  author,
  image,
  liked,
  likesCount,
  onClick,
  onLikeToggle,
}) => {
  // const [isLiked, setIsLiked] = useState(liked);
  // const [likeCount, setLikeCount] = useState(likesCount);

  // const toggleLike = () => {
  //   setIsLiked(!isLiked);
  //   setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  // };

  return (
    <CardContainer onClick={onClick}>
      <ImageSection backgroundImage={image} />
      <ContentSection>
        <Description>
          <Author>{author}</Author>
          <Title>{title}</Title>
        </Description>
        <LikeSection>
          <LikeButton liked={liked} onClick={onLikeToggle}>
            {liked ? <AiFillHeart className="liked" /> : <AiOutlineHeart className="not-liked" />}
          </LikeButton>
          <LikeCount>{likesCount}</LikeCount>
        </LikeSection>
      </ContentSection>
    </CardContainer>
  );
};

export default TemplateCard;