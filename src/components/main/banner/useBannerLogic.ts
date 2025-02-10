import { useState } from "react";
import { PopularTemplate } from "../../../store/template/popularTemplateStore";

export const useBannerLogic = (templates: PopularTemplate[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedTemplates = templates
    .slice()
    .sort((a: PopularTemplate, b: PopularTemplate) => b.likesCount - a.likesCount)
    .slice(0, 7);

  const visibleTemplates = sortedTemplates.slice(
    currentIndex,
    currentIndex + 3
  );

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sortedTemplates.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sortedTemplates.length - 3 ? 0 : prevIndex + 1
    );
  };

  return { visibleTemplates, handlePrev, handleNext };
};