import React, { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
import { useTemplateStore } from "../../../store/template/templateStore";
import { useBannerLogic } from "./useBannerLogic";

import Empty from "../../../assets/images/main/Empty.png"; // 기본 이미지 가져오기

const Banner: React.FC = () => {
  const { templates, fetchTemplates } = useTemplateStore(); // Zustand에서 데이터 가져오기

  useEffect(() => {
    fetchTemplates(); // 템플릿 데이터 로드
    console.log("Loaded Templates:", templates); // 로드된 템플릿 출력
  }, [fetchTemplates]);

  const { visibleTemplates, handlePrev, handleNext } = useBannerLogic(templates); // 로직 분리

  if (templates.length === 0) {
    return (
      <Container>
        <BannerContainer>
          <BannerItem>
            <Image backgroundImage={Empty} />
            <Info>
              <Title>데이터가 없습니다</Title>
            </Info>
          </BannerItem>
        </BannerContainer>
      </Container>
    );
  }

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