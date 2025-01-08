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
}

/** 클릭 가능한 텍스트를 스타일링한 컴포넌트 */
const StyledLink = styled(Link)<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize || "14px"}; /* 기본값 14px */
  color: #6c757d; /* 회색 텍스트 색상 */
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  position: relative;
  display: inline-block;

  /* 하단에 밑줄 추가 */
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #6c757d; /* 밑줄 색상 */
    margin-top: 4px; /* 텍스트와 밑줄 간격 */
  }

  /* Hover 시에도 텍스트 색상 고정 */
  &:hover {
    color: #6c757d; /* Hover 시 회색 고정 */
    text-decoration: none; /* 텍스트 꾸밈 제거 */
  }
`;

const LinkText: React.FC<LinkTextProps> = ({ to, children, fontSize }) => {
  return <StyledLink to={to} fontSize={fontSize}>{children}</StyledLink>;
};

export default LinkText;
