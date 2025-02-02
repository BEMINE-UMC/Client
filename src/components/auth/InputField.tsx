import styled from 'styled-components';
import { BREAKPOINTS } from '../../hooks/useResponsive';
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
  width: 100%;
  height: 60px;
  padding: 16px 20px;
  border: 1px solid #C9C9C9;
  border-radius: 10px;
  font-size: 19px;
  color: #000;
  box-sizing: border-box;
  max-width: 100%;  /* 변경: 부모 컨테이너를 절대 넘지 않도록 설정 */

  &::placeholder {
    color: #C9C9C9;
  }

  &:focus {
    border-color: #333;
    outline: none;
  }

  /* 반응형 스타일 추가 */
  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    width: 100%;
    max-width: 100%;  /* 변경: 부모 컨테이너를 절대 넘지 않도록 설정 */
    height: 34px;
    padding: 8px 12px;
    font-size: 12px;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    width: 100%;
    max-width: 100%;  /* 변경: 부모 컨테이너를 절대 넘지 않도록 설정 */
    height: 43px;
    padding: 12px 16px;
    font-size: 12px;
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
