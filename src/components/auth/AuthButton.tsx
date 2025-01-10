import styled from "styled-components";

interface AuthButtonProps {
  /** 버튼 활성화 여부 */
  disabled?: boolean;
  /** 버튼 클릭 시 호출될 이벤트 핸들러 */
  onClick?: () => void;
  /** 버튼 내부에 표시할 텍스트 */
  children: React.ReactNode;
  /** 버튼 너비 설정 */
  width?: string;
  /** 버튼 폰트 크기 */
  fontSize?: string;
  /** 버튼 높이 설정 */
  height?: string;
}

const StyledAuthButton = styled.button<{
  disabled?: boolean;
  width?: string;
  fontSize?: string;
  height?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize || "20px"};
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 20px 0;
  width: ${({ width }) => width || "143px"};
  height: ${({ height }) => height || "60px"};
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ disabled }) => (disabled ? "#fff" : "#000")};
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#FFE100")};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? "1" : "0.9")};
  }
`;

const AuthButton: React.FC<AuthButtonProps> = ({
  disabled = false,
  onClick,
  children,
  width,
  fontSize,
  height,
}) => {
  return (
    <StyledAuthButton
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      width={width}
      fontSize={fontSize}
      height={height}
    >
      {children}
    </StyledAuthButton>
  );
};

export default AuthButton;
