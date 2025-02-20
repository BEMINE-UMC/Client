import React from 'react';
import Skeleton from 'react-loading-skeleton'; // react-loading-skeleton 라이브러리 사용 예시
import 'react-loading-skeleton/dist/skeleton.css';
import { CardContainer, ImageSection, ContentSection, Description, Author, Title, LikeSection, LikeButton, LikeCount, Badge } from './templatecard/TemplateCard.styles';

const TemplateCardSkeleton: React.FC = () => {
  return (
    <CardContainer>
      <ImageSection>
        <Skeleton height="100%" width="100%" />
      </ImageSection>
      <ContentSection>
        <Description>
          <Author>
            <Skeleton width="80%" />
          </Author>
          <Title>
            <Skeleton width="60%" />
          </Title>
        </Description>
        <LikeSection>
          {/* <LikeButton disabled> */}
            <Skeleton circle width={30} height={30} />
          {/* </LikeButton> */}
          <LikeCount>
            <Skeleton width="50%" />
          </LikeCount>
        </LikeSection>
      </ContentSection>
    </CardContainer>
  );
};

export default TemplateCardSkeleton;