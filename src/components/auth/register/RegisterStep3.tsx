import React from "react";
import LinkText from "../../../components/auth/LinkText";
import FormContainer from "../../../components/auth/FormContainer"; // FormContainer import 추가
import {
  WelcomeMessage,
  Nickname,
  SubMessage,
} from "./Register.styles";

interface RegisterStep3Props {
  nickname: string;
}

const RegisterStep3: React.FC<RegisterStep3Props> = ({ nickname }) => {
  return (
    <FormContainer>
      <WelcomeMessage>
        <div>어서오세요</div>
        <Nickname>{nickname}</Nickname>
        <div>님!</div>
        <SubMessage>로그인 후 BeMine을 즐겨보세요.</SubMessage>
      </WelcomeMessage>
      <LinkText to="/login" fontSize="16px" bold={true}>
        로그인 하러가기
      </LinkText>
    </FormContainer>
  );
};

export default RegisterStep3;
