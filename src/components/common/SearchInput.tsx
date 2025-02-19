import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import useSearchStore from '../../store/search/searchStore';
import { searchPosts } from '../../hooks/search/searchPosts';

const SearchInput = () => {
    // const searchTerm = useSearchStore((state) => state.searchTerm); // zustand 전역 상태
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
    const setResults = useSearchStore((state) => state.setResults);

    const [localSearchTerm, setLocalSearchTerm] = useState("");
    

    const handleSearch = async () => {
        if (localSearchTerm.trim()) {
            console.log("🔍 검색 실행! 검색어:", localSearchTerm);  // [디버깅] 검색어 확인
            
            setSearchTerm(localSearchTerm)
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
        <SearchInputWrapper>
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

const SearchInputWrapper = styled.div`
    display: flex;
    align-items: center;
    min-width: 50%;
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