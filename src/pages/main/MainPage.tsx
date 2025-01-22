// import styled from "styled-components";
import Banner from "../../components/main/banner/Banner";
import NoticeBoard from "../../components/main/NoticeBoard";
// import { useState } from "react";

const MainPage = () => {
    // const [isDarkMode, setIsDarkMode] = useState(false);
    
    // const darkMode = () => {
    //     setIsDarkMode((prevMode) => !prevMode);
    // };
    
    return (
        <>
        {/* // <MainContainer isDarkMode={isDarkMode}>
             <ModeButton onClick={darkMode}>
                 {isDarkMode ? "white" : "dark"}
             </ModeButton> */}
            <Banner />
            <NoticeBoard />
        {/* </MainContainer> */}
        </>
    );
};

export default MainPage;

// const MainContainer = styled.div<{ isDarkMode: boolean }>`
//     background: ${({ isDarkMode }) =>
//         isDarkMode
//             ? "linear-gradient(to bottom, #000000, #fff4a4)" /* 다크 모드 */
//             : "linear-gradient(to bottom, #ffffff, #fff6b4)"}; /* 화이트 모드 */
//     transition: background 0.5s ease; /* 배경색 전환 애니메이션 */
// `;

// const ModeButton = styled.button`
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     padding: 10px 20px;
//     background-color: #ffffff;
//     border: 1px solid #ddd;
//     border-radius: 5px;
//     cursor: pointer;
//     font-size: 16px;
//     z-index: 1000;
//     transition: background-color 0.3s ease;

//     &:hover {
//         background-color: #f0f0f0;
//     }
// `;