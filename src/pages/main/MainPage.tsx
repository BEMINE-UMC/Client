import styled from "styled-components";
import Banner from "../../components/main/banner/Banner";
import NoticeBoard from "../../components/main/NoticeBoard";

import useSearchStore from "../../store/search/searchStore";
import SearchResults from "../../components/search/SearchResults";


const MainPage = () => {

    const results = useSearchStore((state) => state.results);   //전역상태로 부터 검색결과 가져오기
    const searchTerm = useSearchStore((state) => state.searchTerm); // 전역상태로부터 검색어 가져오기

    console.log("🔎 MainPage 렌더링됨! 검색어:", searchTerm, "검색 결과 개수:", results.length);
    console.log("🟢 검색 결과 상태 확인:", results);
    return (
        <PageContainer>
            
            {(results.length > 0 || searchTerm.trim()) ? (
                <SearchResults searchResults={results} searchTerm={searchTerm}/>
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