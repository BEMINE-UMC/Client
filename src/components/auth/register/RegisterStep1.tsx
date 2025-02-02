import React, { useState } from "react";
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
  isEmailVerified: boolean;
  isLoading: {
    emailSend: boolean;
    emailVerify: boolean;
  };
  onSendVerificationCode: (email: string) => Promise<void>;
  onVerifyCode: (code: string) => Promise<void>;
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
  isEmailVerified,
  isLoading,
  onSendVerificationCode,
  onVerifyCode,
}) => {
  const [showTimer, setShowTimer] = useState(false);

  const rules = getValidationRules(1);

  const handleSendVerificationCode = async () => {
    startTimer();
    setShowTimer(true);
    await onSendVerificationCode(email);
  };

  return (
    <div style={{width: "100%"}}>
      <div style={{ marginBottom: "30px" }}>
        <Label htmlFor="nickname">닉네임</Label>
        <InputField
          type="text"
          name="nickname"
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
      <div style={{ marginBottom: "30px" }}>
        <Label htmlFor="email">이메일</Label>
        <HorizontalInputGroup>
          <InputField
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              validateField("email", value, rules);
            }}
          />
          <AuthButton
            disabled={!!errors.email || !email || isLoading.emailSend}
            fontSize="15px"
            onClick={handleSendVerificationCode}
          >
            {isLoading.emailSend ? "전송 중..." : "인증번호 받기"}
          </AuthButton>
        </HorizontalInputGroup>
        {errors.email && <ValidationMessage message={errors.email} />}
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="verificationCode">인증번호</Label>
        <HorizontalInputGroup>
          <InputField
            type="text"
            name="verificationCode"
            placeholder="인증번호를 입력해주세요."
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value;
              setVerificationCode(value);
              validateField("verificationCode", value, rules);
            }}
          />
          <AuthButton
            disabled={!!errors.verificationCode || !verificationCode || isLoading.emailVerify}
            onClick={() => onVerifyCode(verificationCode)}
            fontSize="15px"
          >
            {isLoading.emailVerify ? "확인 중..." : "인증하기"}
          </AuthButton>
        </HorizontalInputGroup>
        {errors.verificationCode && <ValidationMessage message={errors.verificationCode} />}
      </div>
      <div style={{ marginLeft: "9px" }}>
      {isEmailVerified ? (
          <ValidationMessage 
            type="success" 
            message="인증되었습니다." 
          />
        ) : (
          showTimer && timeLeft > 0 && (
            <TimerMessage>
              <span>{`남은시간 ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}</span>
            </TimerMessage>
          )
        )}
        {showTimer && timeLeft === 0 && !isEmailVerified && (
          <ValidationMessage message="인증 시간이 초과되었습니다. 다시 시도하세요." />
        )}
      </div>
      <div style={{  width:"100%", display: "flex", justifyContent: "flex-end", marginTop: "20px"}}>
        <AuthButton
          onClick={onNext}
          disabled={
            !nickname || 
            !email || 
            !verificationCode || 
            !isEmailVerified || 
            Object.values(errors).some((error) => error !== "")
          }
          width="130px"
          height="65px"
          fontSize="20px"
        >
          다음
        </AuthButton>
      </div>
    </div>
  );
};

export default RegisterStep1;
