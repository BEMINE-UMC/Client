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
      <div>
        <p>{nickname} 님의 이메일은</p>
        <HighlightedText>{email}</HighlightedText>
        <p>입니다.</p>
      </div>
      <LinkText to="/login" fontSize="20px" bold>
        로그인 하러가기
      </LinkText>
    </StepContainer>
  );
};

export default FindEmailStep2;
