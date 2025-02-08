import React from "react";
import LinkText from "../../auth/LinkText";
import { StepContainer, HighlightedText } from "./FindEmail.styles";
import AuthButton from "../AuthButton";
import { useNavigate } from "react-router-dom";

interface FindEmailStep2Props {
  nickname: string;
  email: string;
}

const FindEmailStep2: React.FC<FindEmailStep2Props> = ({ nickname, email }) => {
  const navigate = useNavigate();

  return (
    <StepContainer>
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
        <div style={{marginBottom:"85px"}}>
            <p style={{marginBottom:"30px"}}>{nickname} 님의 이메일은</p>
            <HighlightedText>{email}</HighlightedText>
            <span> 입니다.</span>
        </div>
        <AuthButton
          onClick={() => navigate("/login")}
          fontSize="20px"
          width="100%"
        >
          로그인 하러가기
        </AuthButton>
    </div>
    </StepContainer>
  );
};

export default FindEmailStep2;
