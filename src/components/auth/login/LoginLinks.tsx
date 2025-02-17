import React from "react";
import LinkText from "../LinkText";
import { LinkSection, Divider } from "./LoginForm.styles";

const LoginLinks: React.FC = () => (
  <LinkSection>
    <LinkText to="/find-email" underline={false}>
      이메일을 잊으셨나요?
    </LinkText>
    <Divider>|</Divider>
    <LinkText to="/find-password" underline={false}>
      비밀번호를 잊으셨나요?
    </LinkText>
    <Divider>|</Divider>
    <LinkText to="/register" underline={false}>
      회원가입
    </LinkText>
  </LinkSection>
);

export default LoginLinks; 