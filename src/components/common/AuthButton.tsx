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
  /** 버튼 폰트 크기 */
  fontSize?: string;
}

const StyledButton = styled.button<{
  disabled: boolean;
  width?: string;
  fontSize?: string;
}>`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  font-size: ${({ fontSize }) => fontSize || "16px"}; /* 기본값 16px */
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 0; /* 내부 여백 조정 */
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
  fontSize,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      width={width}
      fontSize={fontSize}
    >
      {children}
    </StyledButton>
  );
};

export default AuthButton;
