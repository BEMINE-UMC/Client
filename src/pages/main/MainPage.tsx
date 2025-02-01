
import styled from "styled-components";
import Banner from "../../components/main/banner/Banner";
import NoticeBoard from "../../components/main/NoticeBoard";

const MainPage = () => {

    
    return (
        <PageContainer>

            <Banner />
            <NoticeBoard />

        </PageContainer>
    );
};

export default MainPage;

const PageContainer = styled.div`
    background: linear-gradient(to bottom, #ffffff, #fff6b4);

    @media (max-width: 768px) {
        width: min(100vw, 95%); /* 화면 크기에 맞게 자동 조정 */
    }

    
    @media (max-width: 480px) {
        width: min(100vw, 95%); /* 화면 크기에 맞게 자동 조정 */
    }
`;