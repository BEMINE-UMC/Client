import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  Container,
  BannerContainer,
  BannerItem,
  Image,
  Info,
  Title,  
  ArrowButton,
} from "./Banner.styles";
import { usePopularTemplateStore } from "../../../store/template/popularTemplateStore";
import { useBannerLogic } from "./useBannerLogic";

import Empty from "../../../assets/images/main/Empty.png"; // 기본 이미지 가져오기
import PdfPreview from "../../template/PdfPreview";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";

const Banner: React.FC = () => {
  const { templates, fetchPopularTemplates } = usePopularTemplateStore(); // Zustand에서 데이터 가져오기

  const navigate = useNavigate();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [selectedTemplate, setSelectedTemplate] = useState(null); // ✅ 선택된 템플릿 상태

  const {isLoggedIn} = useAuthStore();

  const handleBannerClick = (templateId: number) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setSelectedTemplate(templateId); // 로그인 되어 있으면 템플릿 선택
    }
  };


  useEffect(() => {
    fetchPopularTemplates(); // 템플릿 데이터 로드
    // console.log("Loaded Templates:", templates); // 로드된 템플릿 출력
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 한번만 실행

  const { visibleTemplates, handlePrev, handleNext } = useBannerLogic(templates); // 로직 분리

  if (!templates || templates.length === 0) {
    return (
      <Container>
        <BannerContainer>
          <BannerItem>
            <Image $backgroundImage={Empty} />
            <Info>
              <Title>데이터가 없습니다</Title>
            </Info>
          </BannerItem>
        </BannerContainer>
      </Container>
    );
  }

  return (
    <>
    <Container>
      <ArrowButton onClick={handlePrev} aria-label="Previous">
        <FaChevronLeft size={20} />
      </ArrowButton>
      <BannerContainer > 
        {visibleTemplates.map((template) => (
          <BannerItem key={template.id} onClick={() => handleBannerClick(template.id)}>
            <Image $backgroundImage={template.image || Empty} />
            <Info>
              <Title>{template.title}</Title>
            </Info>
          </BannerItem>
        ))}
      </BannerContainer>
      <ArrowButton onClick={handleNext} aria-label="Next">
        <FaChevronRight size={20} />
      </ArrowButton>
    </Container>

    {/* ✅ PdfPreview 팝업 추가 */}
    {selectedTemplate && (
      <PdfPreview
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)} // 닫기 기능
        filePDF={selectedTemplate.filePDF}
        filePPT={selectedTemplate.filePPT}
        thumbnail={selectedTemplate.image}
        templateCreatedAt={selectedTemplate.createdAt}
        templateId={selectedTemplate.id}
        title={selectedTemplate.title}
        authorId={selectedTemplate.authorId}
        authorName={selectedTemplate.authorName}
        categoryId={selectedTemplate.categoryId}
        categoryName={selectedTemplate.categoryName}
        likesCount={selectedTemplate.likesCount}
        isLiked={selectedTemplate.isLiked}
        onLike={() => console.log("좋아요 클릭")} // 예제 핸들러
        onDownload={(fileURL) => console.log("다운로드:", fileURL)} // 예제 핸들러
      />
    )}
    </>
  );
};

export default Banner;