import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BREAKPOINTS } from '../../hooks/useResponsive';

interface LinkTextProps {
  /** 이동할 경로 */
  to: string;
  /** 표시할 텍스트 */
  children: React.ReactNode;
  /** 폰트 크기 (기본값: 14px) */
  fontSize?: string;
  /** 텍스트 굵기 여부 (기본값: normal) */
  bold?: boolean;
  /** 밑줄 표시 여부 (기본값: true) */
  underline?: boolean;
  /** 텍스트 색상 (기본값: #B9B9B9) */
  color?: string;
}

interface StyledLinkProps {
  fontSize?: string;
  bold: "true" | "false";
  underline: "true" | "false";
  color?: string;
}

/** 클릭 가능한 텍스트를 스타일링한 컴포넌트 */
const StyledLink = styled(Link)<StyledLinkProps>`
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => (props.bold === "true" ? "700" : "400")};
  text-decoration: none;
  color: ${(props) => props.color || '#B9B9B9'};
  cursor: pointer;
  text-align: center;
  position: relative;
  display: inline-block;

  ${({ underline }) =>
    underline === "true" &&
    `
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: #6c757d;
      margin-top: 4px;
    }
  `}

  &:hover {
    color: ${({ color }) => color || "#6c757d"};
    text-decoration: none;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 8px;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    font-size: 8px;
  }
`;

const LinkText: React.FC<LinkTextProps> = ({
  to,
  children,
  fontSize,
  bold = false,
  underline = true,
  color,
}) => {
  return (
    <StyledLink 
      to={to} 
      fontSize={fontSize} 
      bold={bold ? "true" : "false"} 
      underline={underline ? "true" : "false"} 
      color={color}
    >
      {children}
    </StyledLink>
  );
};

export default LinkText;
