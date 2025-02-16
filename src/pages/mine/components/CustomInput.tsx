import styled from 'styled-components';

const InputField = styled.input`
    width: 100%;
	background-color: white;
	color: black;
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    font-size: 1rem;
    &:focus {
        outline: none;
        border-color: black;
    }
`;

interface CustomInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

const CustomInput = ({ value, onChange, placeholder }: CustomInputProps) => {
	return <InputField value={value} onChange={onChange} placeholder={placeholder} />;
};

export default CustomInput;
