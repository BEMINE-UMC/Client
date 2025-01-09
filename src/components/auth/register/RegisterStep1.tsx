import React from "react";
import Label from "../../../components/auth/Label";
import InputField from "../../../components/auth/InputField";
import ValidationMessage from "../../../components/auth/ValidationMessage";
import HorizontalInputGroup from "../../../components/auth/HorizontalInputGroup";
import AuthButton from "../../../components/auth/AuthButton";
import { TimerMessage } from "./Register.styles";


interface RegisterStep1Props {
  nickname: string;
  setNickname: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  onNext: () => void;
}

const RegisterStep1: React.FC<RegisterStep1Props> = ({
  nickname,
  setNickname,
  email,
  setEmail,
  verificationCode,
  setVerificationCode,
  onNext,
}) => {
  const timeLeft = 180; // 타이머 상태 (예제 값)

  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="nickname">닉네임</Label>
        <InputField
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="email">이메일</Label>
        <HorizontalInputGroup>
          <InputField
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthButton disabled={!email}>인증번호 받기</AuthButton>
        </HorizontalInputGroup>
      </div>

      <div>
        <Label htmlFor="verificationCode">인증번호</Label>
        <HorizontalInputGroup>
          <InputField
            type="text"
            placeholder="인증번호를 입력해주세요."
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <AuthButton disabled={!verificationCode}>인증</AuthButton>
        </HorizontalInputGroup>
      </div>

      <TimerMessage>
        {timeLeft > 0 ? (
          `남은 시간: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
        ) : (
          <ValidationMessage message="인증 시간이 초과되었습니다. 다시 시도하세요." />
        )}
      </TimerMessage>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <AuthButton onClick={onNext} disabled={!nickname || !email || !verificationCode}>
          다음
        </AuthButton>
      </div>
    </>
  );
};

export default RegisterStep1;
