import styled from "styled-components";
import Banner from "../../components/main/banner/Banner";
import NoticeBoard from "../../components/main/NoticeBoard";

import useSearchStore from "../../store/search/searchStore";
import SearchResults from "../../components/search/SearchResults";
import { useEffect } from "react";

import { FaSearch } from "react-icons/fa";


const MainPage: React.FC = () => {

    const results = useSearchStore((state) => state.results);   //전역상태로 부터 검색결과 가져오기
    const searchTerm = useSearchStore((state) => state.searchTerm); // 전역상태로부터 검색어 가져오기

    console.log("🔎 MainPage 렌더링됨! 검색어:", searchTerm, "검색 결과 개수:", results.length);
    console.log("🟢 검색 결과 상태 확인:", results);
    
    useEffect(() => {
        console.log("🔄 검색 상태 변경됨:", { searchTerm, results });
    }, [searchTerm, results]);

    return (
        <PageContainer>
            
            {/* {(results.length > 0 || searchTerm.trim()) ? (
                <SearchResults searchResults={results} searchTerm={searchTerm}/>
            ) : (
                <Banner />
            )} */}

            {searchTerm.trim() ? (
                results.length > 0 ? (
                    <SearchResults searchResults={results} searchTerm={searchTerm}/>
                ) : (
                    <NoResultsContainer>
                        <NoResultsIcon />
                        <NoResultsText> "{searchTerm}"에 대한 검색 결과가 없습니다.</NoResultsText>
                    </NoResultsContainer>
                )
            ) : (
                <Banner />
            )}
            <NoticeBoard />
            
        </PageContainer>
    );
};

export default MainPage;

const PageContainer = styled.div`
    background: linear-gradient(to bottom, #ffffff, #fff6b4);

    @media (max-width: 768px) {
        width: min(100vw, 95%);
    }

    
    @media (max-width: 480px) {
        width: min(100vw, 95%); 
    }
`;

const NoResultsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-top: 50px;

`;

const NoResultsIcon = styled(FaSearch)`
    font-size: 48px;
    color: #bbb;
    margin-bottom: 15px;

    @media (max-width: 480px) {
        font-size: 35px;
    }
`;

const NoResultsText = styled.p`
    font-size: 18px;
    font-weight: 600;
    color: #333;
    text-align: center;
    padding: 10px;
    
    @media (max-width: 480px) {
        font-size: clamp(1rem, 2vw, 1.5rem);
    }
`;