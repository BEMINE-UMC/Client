import styled from "styled-components";
import { BREAKPOINTS } from "../../../hooks/useResponsive";

export const StepContainer = styled.div`
  color : black;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-top: 44px;
  width: 100%;
  color: #B9B9B9; /* 회색 텍스트 색상 */

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 8px;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    font-size: 8px;
  }
`;

export const HighlightedText = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #333;
`;
