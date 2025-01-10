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
  startTimer: () => void;
  timeLeft: number;
  validateField: (field: string, value: string, rules: any) => void;
  errors: Record<string, string>;
  getValidationRules: (step: number) => any;
}

const RegisterStep1: React.FC<RegisterStep1Props> = ({
  nickname,
  setNickname,
  email,
  setEmail,
  verificationCode,
  setVerificationCode,
  onNext,
  startTimer,
  timeLeft,
  validateField,
  errors,
  getValidationRules,
}) => {
  const rules = getValidationRules(1);

  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="nickname">닉네임</Label>
        <InputField
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => {
            const value = e.target.value;
            setNickname(value);
            validateField("nickname", value, rules);
          }}
        />
      </div>
      {errors.nickname && <ValidationMessage message={errors.nickname} />}
      <div>
        <Label htmlFor="email">이메일</Label>
        <HorizontalInputGroup>
          <InputField
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              validateField("email", value, rules);
            }}
          />
          <AuthButton
            disabled={!!errors.email || !email}
            fontSize="16px"
            onClick={() => {
              startTimer();
              console.log("인증번호 발송: 123456");
            }}
          >
            인증번호 받기
          </AuthButton>
        </HorizontalInputGroup>
        {errors.email && <ValidationMessage message={errors.email} />}
      </div>

      <div>
        <Label htmlFor="verificationCode">인증번호</Label>
        <HorizontalInputGroup>
          <InputField
            type="text"
            placeholder="인증번호를 입력해주세요."
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value;
              setVerificationCode(value);
              validateField("verificationCode", value, rules);
            }}
          />
          <AuthButton
            disabled={!!errors.verificationCode || !verificationCode}
            onClick={() => {
              if (verificationCode === "123456") {
                console.log("인증 성공");
              } else {
                console.log("인증 실패");
              }
            }}
          >
            인증
          </AuthButton>
        </HorizontalInputGroup>
        {errors.verificationCode && <ValidationMessage message={errors.verificationCode} />}
      </div>

      <TimerMessage>
        {timeLeft > 0 ? (
          `남은 시간: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
        ) : (
          <ValidationMessage message="인증 시간이 초과되었습니다. 다시 시도하세요." />
        )}
      </TimerMessage>

      <div style={{  width:"100%", display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <AuthButton
          onClick={onNext}
          disabled={!nickname || !email || !verificationCode || Object.values(errors).some((error) => error !== "")}
          width="143px"
          height="65px"
        >
          다음
        </AuthButton>
      </div>
    </>
  );
};

export default RegisterStep1;
