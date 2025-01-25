import styled from 'styled-components';

interface InputFieldProps {
  /** 입력 필드의 타입 (text, email, password 등) */
  type: string;
  name: string;
  /** 입력 필드에 표시할 placeholder */
  placeholder: string;
  /** 입력 필드의 현재 값 */
  value: string;
  /** 값 변경 시 호출될 이벤트 핸들러 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** 텍스트 입력 필드를 제공하는 공용 컴포넌트 */
const StyledInput = styled.input`
  width: 552px;
  height: 60px; /* 전체 높이 60px 고정 */
  padding: 16px 20px;
  border: 1px solid #C9C9C9;
  border-radius: 10px;
  font-size: 19px;
  color: #000; /* 입력된 값의 색상 */
  box-sizing: border-box; /* padding과 border를 height에 포함 */

  &::placeholder {
    color: #C9C9C9; /* placeholder 색상 */
  }

  &:focus {
    border-color: #333;
    outline: none;
  }
`;




const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, value, onChange }) => {
  return <StyledInput 
    type={type} 
    name={name}
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
  />;
};

export default InputField;
