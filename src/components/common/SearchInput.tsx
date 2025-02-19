import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import useSearchStore from '../../store/search/searchStore';
import { searchPosts } from '../../hooks/search/searchPosts';

interface SearchInputProps {
  $width?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ $width }) => {
    // const searchTerm = useSearchStore((state) => state.searchTerm); // zustand 전역 상태
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
    const setResults = useSearchStore((state) => state.setResults);

    const [localSearchTerm, setLocalSearchTerm] = useState("");
    

    const handleSearch = async () => {
        if (localSearchTerm.trim()) {
            console.log("🔍 검색 실행! 검색어:", localSearchTerm);  // [디버깅] 검색어 확인
            
            setLocalSearchTerm(localSearchTerm)
            const data = await searchPosts(localSearchTerm);
            
            console.log("📄 검색 결과:", data);  // [디버깅] 검색 결과 확인
            setResults(data);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    return (
        <SearchInputWrapper $width={$width}>
            <SearchIcon size={20} />
            <InputField 
                type="text" 
                placeholder="검색"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)} 
                onKeyDown={handleKeyDown}
            />
        </SearchInputWrapper>
    );
};

export default SearchInput;

const SearchInputWrapper = styled.div<{ $width?: string }>`
    display: flex;
    align-items: center;
    width: ${({ $width }) => $width || '100%'};
    padding: ${({ theme }) => theme.isMobile ? '0.3rem 0.7rem' : '0.5rem 1rem'};
    border-radius: 5rem;
    background-color: #f5f5f5;
    border: 1px solid #dcdcdc;
`;


const SearchIcon = styled(FaSearch)`
    color: gray;
    margin-right: 10px;
    font-size: ${({ theme }) => theme.isMobile ? '0.6rem' : theme.isTablet ? '0.7rem' : '0.9rem'};
`;

const InputField = styled.input`
    border: none;
    outline: none;
    background: transparent;
    font-size: ${({ theme }) => theme.isMobile ? '0.6rem' : theme.isTablet ? '0.7rem' : '0.9rem'};
    width: 100%;
    color: #333;

    &::placeholder {
        color: gray;
        font-size: ${({ theme }) => theme.isMobile ? '0.6rem' : theme.isTablet ? '0.7rem' : '0.9rem'};
    }
`;