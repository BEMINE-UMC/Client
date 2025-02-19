import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import useSearchStore from '../../store/search/searchStore';
import { searchPosts } from '../../hooks/search/searchPosts';
import { useResponsive } from '../../hooks/useResponsive';

interface SearchInputProps {
  $width?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ $width }) => {
    const { isMobile, isTablet } = useResponsive();
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
    const setResults = useSearchStore((state) => state.setResults);
    const [localSearchTerm, setLocalSearchTerm] = useState("");

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTerm(localSearchTerm);
            const results = await searchPosts(localSearchTerm);
            setResults(results);
        }
    };
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: $width || '100%',
            padding: isMobile ? '0.1rem 0.7rem' : '0.5rem 1rem',
            borderRadius: '5rem',
            backgroundColor: '#f5f5f5',
            border: '1px solid #dcdcdc'
        }}>
            <FaSearch style={{
                color: 'gray',
                marginRight: isMobile ? '5px' : '10px',
                fontSize: isMobile ? '0.6rem' : '1rem'
            }} />
            <InputField 
                type="text" 
                placeholder="검색"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)} 
                onKeyDown={handleKeyDown}
                style={{ 
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: isMobile ? '0.6rem' : isTablet ? '0.7rem' : '0.9rem',
                    width: '100%',
                    color: '#333'
                }}
            />
        </div>
    );
};

export default SearchInput;

// styled-components는 이제 InputField만 사용
const InputField = styled.input`
    &::placeholder {
        color: gray;
    }
`;