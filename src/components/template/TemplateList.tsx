import styled from "styled-components";
import TemplateCard from "./templatecard/TemplateCard";
import { FC } from "react";

import mockData from "../modal/template/templateMockData"; 

interface TemplateListProps {
  selectedCategory: string;
}

const TemplateList: FC<TemplateListProps> = ({ selectedCategory }) => {
  const filteredData =
    selectedCategory === "전체"
      ? mockData
      : mockData.filter((template) => template.category === selectedCategory);

  return (
    <ListContainer>
      {filteredData.map((template) => (
        <TemplateCard
          key={template.id}
          title={template.title}
          author={template.author}
          image={template.image}
          liked={template.liked}
          likesCount={template.likesCount}
        />
      ))}
    </ListContainer>
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
