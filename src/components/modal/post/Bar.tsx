import React from "react";
import styled from "styled-components";
import { ChevronLeft } from "lucide-react"; // lucide-react 아이콘 사용

const BarContainer = styled.div`
  width: 100%;
  background-color: transparent;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  top: 0;
  z-index: 1000;

  @media (min-width: 1025px) {
    display: none; /* 데스크톱에서는 숨기기 */
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  &:hover {
    opacity: 0.7;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LogoImage = styled.img`
  width: 80px;
  height: auto;
`;

interface BarProps {
  onBackClick: () => void;
  onLikeClick?: () => void;
  liked?: boolean;
}

const Bar: React.FC<BarProps> = ({ onBackClick, onLikeClick, liked }) => {
  return (
    <BarContainer>
      <IconButton onClick={onBackClick}>
        <ChevronLeft size={24} />
      </IconButton>
      <LogoWrapper>
        <LogoImage src="/Bemine3D_Logo.svg" alt="Logo" />
      </LogoWrapper>
      
    </BarContainer>
  );
};

export default Bar;