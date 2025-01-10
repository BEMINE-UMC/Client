import React from "react";
import LinkText from "../../auth/LinkText";
import { StepContainer, HighlightedText } from "./FindEmail.styles";

interface FindEmailStep2Props {
  nickname: string;
  email: string;
}

const FindEmailStep2: React.FC<FindEmailStep2Props> = ({ nickname, email }) => {
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
        <LinkText to="/login" fontSize="20px" bold={true} color="#707070">
            로그인 하러가기
        </LinkText>
    </div>
    </StepContainer>
  );
};

export default FindEmailStep2;
