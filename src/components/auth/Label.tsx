import styled from "styled-components";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const StyledLabel = styled.label`
  font-size: 19px;
  display: block;
  margin-bottom: 11px;
`;

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
