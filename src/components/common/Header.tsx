import { useNavigate } from "react-router-dom";
import CustomBox from "../../pages/mine/components/CustomBox";
import CustomRow from "../../pages/mine/components/CustomRow";
import CustomButton from "../../pages/mine/components/CustomButton";
import CustomFont from "../../pages/mine/components/CustomFont";
import StyledImg from "../../pages/mine/components/StyledImg";
import CustomDivider from "../../pages/mine/components/CustomDivider";
import logo from '../../assets/images/main/BeMine_3D.png';
import logotext from '../../assets/images/main/Logo_Text.svg';
import SearchInput from "./SearchInput";
import { useAuthStore } from '../../store/authStore';

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const setLoggedOut = useAuthStore((state) => state.setLoggedOut);

    const GoMain = () => { navigate('/'); }
    const GoTemplate = () => { navigate('/template'); }
    const GoMy = () => { navigate('/my'); }
    const GoLogin = () => { navigate('/login'); }

    const handleLogout = () => {
        setLoggedOut();
        navigate('/');
    };

    return (
        <>
            <CustomBox $width="100%" $height="auto" $padding="1rem" $backgroundcolor="white" $justifycontent="center" $alignitems="center" $borderradius="0">
                <CustomRow $width="100%" $height="auto" $padding="0" $alignitems="center" $justifycontent="center" $gap="3rem">
                    <CustomButton $width='auto' $height='auto' $backgroundColor="transparent" $padding="0" onClick={GoMain}>
                        <CustomRow $width="auto" $height="auto" $gap="0.5rem">
                            <StyledImg src={logo} $width="4rem" />
                            <StyledImg src={logotext} $width="8rem" />
                        </CustomRow>
                    </CustomButton>

                    <SearchInput />

                    <CustomRow $width="auto" $height="auto" $gap="0.5rem">
                        <CustomButton $width='auto' $height='auto' $padding="0.5rem" $backgroundColor="transparent" $borderRadius="5rem"
                            onClick={GoMain}>
                            <CustomFont $color="black" $fontweight="bold" $font="0.9rem">홈</CustomFont>
                        </CustomButton>
                        <CustomButton $width='auto' $height='auto' $padding="0.5rem" $backgroundColor="transparent" $borderRadius="5rem"
                            onClick={GoTemplate}>
                            <CustomFont $color="black" $fontweight="bold" $font="0.9rem">템플릿</CustomFont>
                        </CustomButton>
                        {isLoggedIn ? (
                            <>
                                <CustomButton $width='auto' $height='auto' $padding="0.5rem" $backgroundColor="transparent" $borderRadius="5rem"
                                    onClick={GoMy}>
                                    <CustomFont $color="black" $fontweight="bold" $font="0.9rem">마이페이지</CustomFont>
                                </CustomButton>
                                <CustomButton $width='auto' $height='auto' $padding="0.5rem" $backgroundColor="transparent" $borderRadius="5rem"
                                    onClick={handleLogout}>
                                    <CustomFont $color="black" $fontweight="bold" $font="0.9rem">로그아웃</CustomFont>
                                </CustomButton>
                            </>
                        ) : (
                            <CustomButton $width='auto' $height='auto' $padding="0.5rem 1rem" $backgroundColor="#FFE100" $borderRadius="5rem"
                                onClick={GoLogin}>
                                <CustomFont $color="black" $fontweight="bold" $font="0.9rem">시작하기</CustomFont>
                            </CustomButton>
                        )}
                    </CustomRow>
                </CustomRow>
            </CustomBox>
            <CustomDivider $width="100%" $height="1px" $backgroundcolor="#D3D3D3" />
        </>
    );
};

export default Header;