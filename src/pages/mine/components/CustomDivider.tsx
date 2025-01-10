import styled from "styled-components";

interface CustomDividerProps {
	$width?: string;
	$height?: string;
	$backgroundcolor?: string;
	$borderradius?: string;
}

const CustomDivider = styled.div<CustomDividerProps>`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "1px"};
  background: ${(props) => props.$backgroundcolor || "#1E1E1E"};
  border-radius: ${(props) => props.$borderradius || "0.5rem"};
`;

export default CustomDivider;