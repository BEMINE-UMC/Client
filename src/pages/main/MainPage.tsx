
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
`;