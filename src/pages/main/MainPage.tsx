import styled from "styled-components";
import Banner from "../../components/main/banner/Banner";
import NoticeBoard from "../../components/main/NoticeBoard";

import useSearchStore from "../../store/search/searchStore";
import SearchResults from "../../components/search/SearchResults";


const MainPage: React.FC = () => {

    const results = useSearchStore((state) => state.results);   //전역상태로 부터 검색결과 가져오기
    const searchTerm = useSearchStore((state) => state.searchTerm); // 전역상태로부터 검색어 가져오기

    console.log("🔎 MainPage 렌더링됨! 검색어:", searchTerm, "검색 결과 개수:", results.length);
    console.log("🟢 검색 결과 상태 확인:", results);
    return (
        <MainContainer>
            <ContentContainer>
                {(results.length > 0 || searchTerm.trim()) ? (
                    <SearchResults searchResults={results} searchTerm={searchTerm}/>
                ) : (
                    <Banner />
                )}
                <NoticeBoard />
            </ContentContainer>
        </MainContainer>
    );
};

export default MainPage;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;  // 세로 방향 정렬
    width: 100%;
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    padding: 20px;
`;