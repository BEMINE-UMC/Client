import { FC, useCallback, useEffect, useState } from "react";
import { useTemplateStore } from "../../store/template/templateStore";
import TemplateCard from "./templatecard/TemplateCard";
import styled from "styled-components";
import { useAuthStore } from "../../store/authStore";
import { Template } from "./types/templateTypes";
import { getImageOrDefault } from "../../utils/imageUtils";
import { useTemplateDetailStore } from "../../store/template/templateDetailStore";
import PdfPreview from "./PdfPreview";



interface TemplateListProps {
  selectedCategory: string;
}

const TemplateList: FC<TemplateListProps> = ({ selectedCategory }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {templates, fetchTemplates} = useTemplateStore();

  const { fetchTemplateDetail } = useTemplateDetailStore();
  
  const{isLoggedIn} = useAuthStore();
  
  const categoryMap: Record<string, number> = {
    "콘텐츠 마케터": 1,
    "브랜드 마케터": 2,
    "퍼포먼스 마케터": 3,
    "바이럴 마케터": 4,
  };

  const categoryId = selectedCategory === "전체" ? undefined : categoryMap[selectedCategory];

  const fetchCategoryTemplates = useCallback(() => {
    console.log ("선택된 카테고리:", selectedCategory);
    console.log("변환된 카테고리ID:", categoryId);

    fetchTemplates(categoryId === undefined ? undefined : categoryId);
  }, [selectedCategory, fetchTemplates]);

  useEffect(() => {
    fetchCategoryTemplates();
  }, [fetchCategoryTemplates, fetchTemplates]);

  useEffect(() => {
    console.log("불러온 템플릿 데이터:", templates);
  }, [templates]);

  const openModal = async (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
    await fetchTemplateDetail(template.templateId); // 디테일 api 연결시
  }

  const closeModal = () => {
    setSelectedTemplate(null);
    setIsModalOpen(false);
  }

  return (
      <>
        <ListContainer>
          {templates && templates.length > 0 ? (
            templates.map((template) => (
              <TemplateCard
                key={template.templateId}
                data={{
                  ...template,
                  thumbnail: getImageOrDefault(template.thumbnail),
                  likedStatus: template.likedStatus || false,
                  likeCount: template.likesCount || 0,
                  surveyCount: template.surveyCount || 0, // ✅ 추가된 필드 전달
                }}
                onCardClick={() => openModal(template)}
                isLoggedIn={isLoggedIn} // 로그인 상태 전달
              />
            ))
          ) : (
            <p>게시물이 없습니다.</p>
          )}
        </ListContainer>
        {isModalOpen && selectedTemplate && (
          <PdfPreview
          isOpen={isModalOpen}
          onClose={closeModal}
          filePDF={selectedTemplate.file || ""} // `data.file`을 `pdfUrl`로 전달
          isLiked={selectedTemplate.likedStatus || false}
          onLike={() => console.log("좋아요 클릭")}
          onDownload={() => console.log("다운로드 클릭")} thumbnail={""} templateCreatedAt={""} templateId={0} title={""} authorId={0} authorName={""} categoryId={0} categoryName={""} likesCount={0}        />
        )}

      </>
  );
};

export default TemplateList;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  padding: 16px;
  grid-template-columns: repeat(4, 1fr) ;
  margin-left: -6%;

  @media (max-width: 768px) {
    display: grid !important;
    
    justify-content: center;
    margin-left: -3%;
  }

  @media (max-width: 480px) {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) ;
    justify-content: center;
    margin-left: 5vw;
  }

`;