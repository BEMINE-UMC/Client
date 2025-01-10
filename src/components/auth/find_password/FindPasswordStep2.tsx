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
      <div>
        <p>{nickname} 님의 비밀번호는</p>
        <HighlightedText>{password}</HighlightedText>
        <p>입니다.</p>
      </div>
      <LinkText to="/login" fontSize="20px" bold>
        로그인 하러가기
      </LinkText>
    </StepContainer>
  );
};

export default FindPasswordStep2;
