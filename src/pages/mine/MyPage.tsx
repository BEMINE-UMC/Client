import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import CustomRow from "./components/CustomRow";
import CustomDivider from "./components/CustomDivider";

import Profile from "./main_component/Profile";
import MobileProfile from "./for_mobile/main_component/mobile_profile";
import Likes from "./main_component/Likes";
import Workspace from "./main_component/workspaces/Workspace";
import MobileWorkspace from "./for_mobile/main_component/mobile_workspace";

// Styled-component를 사용해 반응형 디자인 적용
const ResponsiveRow = styled(CustomRow)`
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  flex-direction: row;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0.25rem;
  }
`;

const ResponsiveDivider = styled(CustomDivider)`
  width: 0.5px;
  height: 90vh;
  background-color: #d9d9d9;

  @media (max-width: 1024px) {
    width: 100%;
    height: 0.5px;
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 0.5px;
    margin: 0.5rem 0;
  }
`;

const MyPage = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 });

  return (
    <ResponsiveRow>
      {isTabletOrMobile ? <MobileProfile /> : <Profile />}
      <Likes />
      <ResponsiveDivider />
      {isTabletOrMobile ? <MobileWorkspace /> : <Workspace />}
    </ResponsiveRow>
  );
};

export default MyPage;
