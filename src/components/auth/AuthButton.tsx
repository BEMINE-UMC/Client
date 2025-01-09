import styled from "styled-components";

interface ButtonProps {
  /** 버튼 활성화 여부 */
  disabled?: boolean;
  /** 버튼 클릭 시 호출될 이벤트 핸들러 */
  onClick: () => void;
  /** 버튼 내부에 표시할 텍스트 */
  children: string;
  /** 버튼 너비 설정 */
  width?: string;
}

const StyledButton = styled.button<{ disabled: boolean; width?: string }>`
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 20px 0; /* 버튼 내부 여백 */
  width: ${({ width }) => width || "143px"};
  height: 60px; /* 입력 필드와 동일한 높이로 설정 */
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  color: ${({ disabled }) => (disabled ? "#fff" : "#000")};
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#FFE100")};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? "1" : "0.9")};
  }
`;

const AuthButton: React.FC<ButtonProps> = ({
  disabled = false,
  onClick,
  children,
  width,
}) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick} width={width}>
      {children}
    </StyledButton>
  );
};

export default AuthButton;
