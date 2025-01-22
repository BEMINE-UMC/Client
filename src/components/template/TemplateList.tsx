import styled from "styled-components";
import TemplateCard from "./templatecard/TemplateCard";
import { FC, useState } from "react";
import mockData from "../modal/template/templateMockData";
import TemplateModal from "../modal/template/TemplateModal";

interface TemplateListProps {
  selectedCategory: string;
}

const TemplateList: FC<TemplateListProps> = ({ selectedCategory }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof mockData[number] | null>(null);
  const [likedTemplates, setLikedTemplates] = useState<number[]>([]);

  // 필터링된 데이터: 전체 또는 선택된 카테고리에 맞는 데이터
  const filteredData = selectedCategory === "전체"
    ? mockData
    : mockData.filter((template) => template.category === selectedCategory);

  const openModal = (template: typeof mockData[number]) => setSelectedTemplate(template); // 모달 열기
  const closeModal = () => setSelectedTemplate(null); // 모달 닫기

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
            liked={likedTemplates.includes(template.id)} // 좋아요 상태 전달
            likesCount={likedTemplates.filter(id => id === template.id).length} // 좋아요 개수 전달
            onClick={() => openModal(template)} // 클릭 시 모달 열기
          />
        ))}
      </ListContainer>
      {selectedTemplate && (
        <TemplateModal
          title={selectedTemplate.title}
          author={selectedTemplate.author}
          onClose={closeModal} // 모달 닫기 함수 전달
          file={selectedTemplate.file}
          download={selectedTemplate.download}
          liked={likedTemplates.includes(selectedTemplate.id)} // 좋아요 상태 전달
          likesCount={likedTemplates.filter(id => id === selectedTemplate.id).length} // 좋아요 개수 전달
          onLikeToggle={() => toggleLike(selectedTemplate.id)} // 좋아요 상태 변경 함수 전달
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
`;