import React from "react";
import InputField from "../../auth/InputField";
import ValidationMessage from "../../auth/ValidationMessage";
import AuthButton from "../../auth/AuthButton";
import Label from "../../auth/Label";
import { StepContainer } from "./FindEmail.styles";

interface FindEmailStep1Props {
  nickname: string;
  setNickname: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onNext: () => void;
}

const FindEmailStep1: React.FC<FindEmailStep1Props> = ({
  nickname,
  setNickname,
  password,
  setPassword,
  onNext,
}) => {
  const [error, setError] = React.useState("");

  const handleNext = () => {
    if (nickname === "test" && password === "password123") {
      onNext();
    } else {
      setError("해당 정보의 이메일이 존재하지 않습니다.");
    }
  };

  return (
    <StepContainer>
      <div style={{marginBottom : "11px"}}>
        <Label htmlFor="nickname">닉네임</Label>
        <InputField
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setError("");
          }}
        />
      </div>
      <div style={{marginBottom : "45px"}}>
        <Label htmlFor="password">비밀번호</Label>
        <InputField
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
      </div>
      {error && <ValidationMessage message={error} />}
      <AuthButton 
        width="100%" 
        onClick={handleNext} 
        disabled={!nickname || !password}
        fontSize="20px"
      >
        이메일 찾기
      </AuthButton>
    </StepContainer>
  );
};

export default FindEmailStep1;
