import { useState } from "react";
import { Template } from "../../../store/template/templateStore";

export const useBannerLogic = (templates: Template[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedTemplates = templates
    .slice()
    .sort((a: Template, b: Template) => b.likesCount - a.likesCount)
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