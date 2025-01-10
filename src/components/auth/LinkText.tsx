import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

/** 클릭 가능한 텍스트를 스타일링한 컴포넌트 */
const StyledLink = styled(Link)<{
  fontSize?: string;
  bold?: boolean;
  underline?: boolean;
  color?: string;
}>`
  font-size: ${({ fontSize }) => fontSize || "14px"}; /* 기본값 14px */
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")}; /* bold 여부에 따라 폰트 굵기 설정 */
  color: ${({ color }) => color || "#B9B9B9"}; /* 기본값 #B9B9B9 */
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  position: relative;
  display: inline-block;

  /* underline 여부에 따라 밑줄 스타일 조정 */
  ${({ underline }) =>
    underline &&
    `
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: #6c757d; /* 밑줄 색상 */
      margin-top: 4px; /* 텍스트와 밑줄 간격 */
    }
  `}

  /* Hover 시에도 텍스트 색상 고정 */
  &:hover {
    color: ${({ color }) => color || "#6c757d"}; /* Hover 시 색상 유지 */
    text-decoration: none; /* 텍스트 꾸밈 제거 */
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
    <StyledLink to={to} fontSize={fontSize} bold={bold} underline={underline} color={color}>
      {children}
    </StyledLink>
  );
};

export default LinkText;
