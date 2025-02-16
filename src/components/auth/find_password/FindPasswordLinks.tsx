import React from "react";
import LinkText from "../../auth/LinkText";
import { LinksContainer } from "./FindPassword.styles";

const FindPasswordLinks: React.FC = () => {
  return (
    <LinksContainer>
      <LinkText to="/find-email" underline={false}>
        이메일을 잊으셨나요?
      </LinkText>
      <span style={{ margin: "0 10px" }}>|</span>
      <LinkText to="/register" underline={false}>
        회원가입
      </LinkText>
    </LinksContainer>
  );
};

export default FindPasswordLinks;
