import styled from 'styled-components';

interface StyledImgProps {
	$width?: string;
	$height?: string;
	$margin?: string;
	$padding?: string;
	$borderradius?: string;
	$border?: string;
	$cursor?: string;
	$boxshadow?: string;
}

const StyledImg = styled.img<StyledImgProps>`
  width: ${(props) => props.$width || 'auto'};
  height: ${(props) => props.$height || 'auto'};
  margin: ${(props) => props.$margin || '0'};
  padding: ${(props) => props.$padding || '0'};
  border-radius: ${(props) => props.$borderradius || '0'};
  border: ${(props) => props.$border || 'none'};
  cursor: ${(props) => props.$cursor || 'auto'};
  box-shadow: ${(props) => props.$boxshadow || "none"};
`;

export default StyledImg;