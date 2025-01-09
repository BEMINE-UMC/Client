import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchInputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    padding: 0.5rem 1rem;
    border-radius: 5rem;
    background-color: #f5f5f5;
    border: 1px solid #dcdcdc;
`;

const SearchIcon = styled(FaSearch)`
    color: gray;
    margin-right: 10px;
`;

const InputField = styled.input`
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    width: 100%;
    color: #333;

    &::placeholder {
        color: gray;
    }
`;

const SearchInput = () => {
	return (
		<SearchInputWrapper>
			<SearchIcon size={20} />
			<InputField type="text" placeholder="검색" />
		</SearchInputWrapper>
	);
};

export default SearchInput;