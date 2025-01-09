import styled from "styled-components";

interface CustomButtonProps {
	$width?: string | number;
	$height?: string | number;
	$gap?: string | number;
	$display?: string;
	$flexDirection?: string;
	$alignItems?: string;
	$justifyContent?: string;
	$margin?: string;
	$padding?: string;
	$backgroundColor?: string;
	$color?: string;
	$border?: string;
	$borderRadius?: string;
	$hoverBackgroundColor?: string;
	$hoverOpacity?: string | number;
	$boxshadow?: string;
}

const CustomButton = styled.button<CustomButtonProps>`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "3rem"};
  gap: ${(props) => props.$gap || "1rem"};
  display: ${(props) => props.$display || "flex"};
  flex-direction: ${(props) => props.$flexDirection || "row"};
  align-items: ${(props) => props.$alignItems || "center"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  margin: ${(props) => props.$margin || "0"};
  padding: ${(props) => props.$padding || "0.75rem 1.5rem"};
  
  background: ${(props) => props.$backgroundColor || "#D9D9D9"};
  
  color: ${(props) => props.$color || "black"};
  border: ${(props) => props.$border || "none"};
  border-radius: ${(props) => props.$borderRadius || "0.5rem"};
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;

  box-shadow: ${(props) => props.$boxshadow || "none"};

  /* Hover 스타일링 */
  &:hover {
    background: ${(props) =>
		props.$hoverBackgroundColor || props.$backgroundColor};
    opacity: ${(props) => props.$hoverOpacity || 0.7};
  }
`;

export default CustomButton;