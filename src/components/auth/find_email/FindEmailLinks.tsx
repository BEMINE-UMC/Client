import React from "react";
import LinkText from "../../auth/LinkText";
import { LinksContainer } from "./FindEmail.styles";

const FindEmailLinks: React.FC = () => {
  return (
    <LinksContainer>
      <LinkText to="/find-password" underline={false}>
        비밀번호를 잊으셨나요?
      </LinkText>
      <span>|</span>
      <LinkText to="/register" underline={false}>
        회원가입
      </LinkText>
    </LinksContainer>
  );
};

export default FindEmailLinks;
