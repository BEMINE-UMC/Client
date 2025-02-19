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
import { useTemplateDetailStore } from "../../../store/template/templateDetailStore";
import PdfPreview from "../../template/PdfPreview";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";

const Banner: React.FC = () => {
  const { templates, fetchPopularTemplates } = usePopularTemplateStore(); // Zustand에서 데이터 가져오기
  const { visibleTemplates, handlePrev, handleNext } = useBannerLogic(templates); // 로직 분리

  const { fetchTemplateDetail, templateDetail } = useTemplateDetailStore();

  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPopularTemplates(); // 인기 템플릿 데이터 로드
  }, [fetchPopularTemplates]); // 의존성 배열에 fetchPopularTemplates 추가

  const handleBannerClick = async (templateId: number) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    await fetchTemplateDetail(templateId); // API 호출
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <BannerItem key={template.id} onClick={() => handleBannerClick(template.id)} >
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

    {isModalOpen && templateDetail && (
      <PdfPreview
        isOpen={isModalOpen}
        onClose={closeModal}
        filePDF={templateDetail.filePDF}
        isLiked={templateDetail.fileLikeStatus}
        onLike={() => console.log("좋아요 클릭")}
        onDownload={() => console.log("다운로드 클릭")}
        thumbnail=""
        templateCreatedAt=""
        templateId={templateDetail.templateId}
        templteId={templateDetail.templateId}
        title=""
        authorId={0}
        authorName=""
        categoryId={0}
        categoryName=""
        likesCount={0}
      />
    )}
    </>
  );
};

export default Banner;