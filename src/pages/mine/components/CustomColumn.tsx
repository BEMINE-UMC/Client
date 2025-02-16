import styled from 'styled-components';

interface CustomColumnProps {
	$width?: string;
	$height?: string;
	$minHeight?: string;
	$gap?: string;
	$alignitems?: string;
	$justifycontent?: string;
	$margin?: string;
	$padding?: string;
}

const CustomColumn = styled.div<CustomColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.$width || 'auto'};
  height: ${(props) => props.$height || 'auto'};
  min-height: ${(props) => props.$minHeight || 'none'};
  gap: ${(props) => props.$gap || '30px'};
  align-items: ${(props) => props.$alignitems || 'center'};
  justify-content: ${(props) => props.$justifycontent || 'center'};
  margin: ${(props) => props.$margin || '0'};
  padding: ${(props) => props.$padding || '0'};
`;

export default CustomColumn;