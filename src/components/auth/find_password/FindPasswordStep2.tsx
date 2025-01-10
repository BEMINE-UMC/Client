import React from "react";
import LinkText from "../../auth/LinkText";
import { StepContainer, HighlightedText } from "./FindPassword.styles";

interface FindPasswordStep2Props {
  nickname: string;
  password: string;
}

const FindPasswordStep2: React.FC<FindPasswordStep2Props> = ({
  nickname,
  password,
}) => {
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
            <div style={{ marginBottom: "85px" }}>
              <p style={{ marginBottom: "30px" }}>{nickname} 님의 비밀번호는</p>
              <HighlightedText>{password}</HighlightedText>
              <span> 입니다.</span>
            </div>
            <LinkText to="/login" fontSize="20px" bold={true} color="#707070">
              로그인 하러가기
            </LinkText>
          </div>
        </StepContainer>
      );
      
};

export default FindPasswordStep2;
