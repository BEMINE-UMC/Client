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
  /** 버튼 타입 설정 */
  type?: 'button' | 'submit' | 'reset';
  /** 버튼 텍스트 색상 */
  color?: string;
}

const AuthButton = styled.button<AuthButtonProps>`
  width: ${props => props.width || '100%'};
  height: 60px;
  background-color: ${props => props.disabled ? '#D3D3D3' : '#FFE100'};
  border: none;
  border-radius: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: bold;
  color: ${props => props.disabled ? '#FFFFFF' : '#000000'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.disabled ? '#D3D3D3' : '#FFD000'};
  }

  &:active {
    background-color: ${props => props.disabled ? '#D3D3D3' : '#FFC000'};
  }
`;

const AuthButtonComponent: React.FC<AuthButtonProps> = ({
  disabled = false,
  onClick,
  children,
  width,
  fontSize,
  height,
  type,
  color,
}) => {
  return (
    <AuthButton
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      width={width}
      fontSize={fontSize}
      height={height}
      type={type}
      color={color}
    >
      {children}
    </AuthButton>
  );
};

export default AuthButtonComponent;
