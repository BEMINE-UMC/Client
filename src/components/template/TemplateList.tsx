import styled from "styled-components";
import TemplateCard from "./templatecard/TemplateCard";
import { FC, useState } from "react";
import mockData from "../modal/template/templateMockData";
import PdfPreview from "./PdfPreview"; // PdfPreview import 추가

interface TemplateListProps {
  selectedCategory: string;
}

const TemplateList: FC<TemplateListProps> = ({ selectedCategory }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof mockData[number] | null>(null);
  const [likedTemplates, setLikedTemplates] = useState<number[]>([]);

  const filteredData = selectedCategory === "전체"
    ? mockData
    : mockData.filter((template) => template.category === selectedCategory);

  const openModal = (template: typeof mockData[number]) => setSelectedTemplate(template);
  const closeModal = () => setSelectedTemplate(null);

  // 좋아요 상태 업데이트 함수
  const toggleLike = (templateId: number) => {
    setLikedTemplates((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  return (
    <>
      <ListContainer>
        {filteredData.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
            liked={likedTemplates.includes(template.id)}
            likesCount={likedTemplates.filter(id => id === template.id).length}
            onClick={() => openModal(template)}
            onLikeToggle={() => toggleLike(template.id)}
          />
        ))}
      </ListContainer>

      {selectedTemplate && (
        <PdfPreview
        pdfUrl={selectedTemplate?.file ?? ""} // ✅ undefined 방지
          onClose={closeModal}
          onLike={() => toggleLike(selectedTemplate.id)}
          onDownload={() => console.log("다운로드 기능 추가 예정")}
          isLiked={likedTemplates.includes(selectedTemplate.id)}
          onEdit={() => console.log("편집 기능 추가 예정")} // ✅ 추가
        />
      )}
    </>
  );
};

export default TemplateList;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;

  @media (max-width: 768px) {
    width: min(100vw, 100%);
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3%;
    margin-left: -5%;
  }

  @media (max-width: 480px) {
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
`;