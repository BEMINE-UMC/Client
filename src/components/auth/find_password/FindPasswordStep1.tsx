import React from "react";
import InputField from "../../auth/InputField";
import ValidationMessage from "../../auth/ValidationMessage";
import AuthButton from "../../auth/AuthButton";
import Label from "../../auth/Label";
import { StepContainer } from "./FindPassword.styles";

interface FindPasswordStep1Props {
  nickname: string;
  setNickname: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onNext: () => void;
}

const FindPasswordStep1: React.FC<FindPasswordStep1Props> = ({
  nickname,
  setNickname,
  email,
  setEmail,
  onNext,
}) => {
  const [error, setError] = React.useState("");

  const handleNext = () => {
    if (nickname === "test" && email === "test@example.com") {
      onNext();
    } else {
      setError("해당 닉네임의 가입 이메일이 존재하지 않습니다.");
    }
  };

  return (
    <StepContainer>
      <div style={{marginBottom : "11px"}}>
        <Label htmlFor="nickname">닉네임</Label>
        <InputField
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setError("");
          }}
        />
      </div>
      <div style={{marginBottom : "45px"}}>
        <Label htmlFor="email">이메일</Label>
        <InputField
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
      </div>
      {error && <ValidationMessage message={error} />}
      <AuthButton 
        width="100%" 
        onClick={handleNext} 
        disabled={!nickname || !email}
        fontSize="20px"
      >
        비밀번호 찾기
      </AuthButton>
    </StepContainer>
  );
};

export default FindPasswordStep1;
