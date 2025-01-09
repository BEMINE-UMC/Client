import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import templateMockData from "../../../mock/templateMockData";
import {
  Container,
  BannerContainer,
  BannerItem,
  Image,
  Info,
  Title,
  Author,
  ArrowButton,
} from "./Banner.styles";

const Banner: React.FC = () => {
  const topTemplates = templateMockData
    .slice()
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 7);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topTemplates.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === topTemplates.length - 3 ? 0 : prevIndex + 1
    );
  };

  const visibleTemplates = topTemplates.slice(
    currentIndex,
    currentIndex + 3
  );

  return (
    <Container>
      <ArrowButton onClick={handlePrev} aria-label="Previous">
        <FaChevronLeft size={20} />
      </ArrowButton>
      <BannerContainer>
        {visibleTemplates.map((template) => (
          <BannerItem key={template.id}>
            <Image backgroundImage={template.image} />
            <Info>
              <Title>{template.title}</Title>
              <Author>{template.author}</Author>
            </Info>
          </BannerItem>
        ))}
      </BannerContainer>
      <ArrowButton onClick={handleNext} aria-label="Next">
        <FaChevronRight size={20} />
      </ArrowButton>
    </Container>
  );
};

export default Banner;