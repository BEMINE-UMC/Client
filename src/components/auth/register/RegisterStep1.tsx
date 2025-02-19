import React, { useState } from "react";
import Label from "../Label";
import InputField from "../InputField";
import ValidationMessage from "../ValidationMessage";
import HorizontalInputGroup from "../HorizontalInputGroup";
import AuthButton from "../AuthButton";
import api from "../../../api/axios";
import { RegisterStep1Props } from "../../../types/auth";

const RegisterStep1: React.FC<RegisterStep1Props> = ({
  userData,
  setUserData,
  startTimer,
  timeLeft,
  validateField,
  errors,
  getValidationRules,
  isEmailVerified,
  isLoading,
  setIsLoading,
  onVerifySuccess,
  onNext,
}) => {
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [nicknameError, setNicknameError] = useState<string>("");
  const rules = getValidationRules(1);

  const handleSendVerificationCode = async () => {
    if (isLoading.emailSend) return;

    try {
      setIsLoading(prev => ({ ...prev, emailSend: true }));
      
      const response = await api.post('/users/sendEmail', { email: userData.email });
      
      if (response.data.resultType === "SUCCESS") {
        startTimer();
        alert(response.data.success.message);
      }
    } catch (error: any) {
      if (error.response?.data?.error?.errorCode === "A018") {
        validateField("email", userData.email, rules);
      }
      alert(error.response?.data?.error?.reason || "인증번호 전송에 실패했습니다.");
    } finally {
      setIsLoading(prev => ({ ...prev, emailSend: false }));
    }
  };

  const handleVerifyCode = async () => {
    if (isLoading.emailVerify) return;
    
    try {
      setIsLoading(prev => ({ ...prev, emailVerify: true }));
      
      const response = await api.post('/users/checkEmail', {
        email: userData.email,
        code: userData.verificationCode
      });

      if (response.data.resultType === "SUCCESS") {
        onVerifySuccess();
        alert(response.data.success.message);
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        const errorCode = error.response.data.error.errorCode;
        if (errorCode === "A018") {
          validateField("email", userData.email, rules);
        } else if (["A019", "A020"].includes(errorCode)) {
          validateField("verificationCode", userData.verificationCode, rules);
        }
      }
    } finally {
      setIsLoading(prev => ({ ...prev, emailVerify: false }));
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserData(prev => ({ ...prev, nickname: value }));
    validateField("nickname", value, rules);
    setIsNicknameVerified(false);  // 닉네임 변경 시 인증 상태 초기화
  };

  const handleCheckNickname = async () => {
    if (isCheckingNickname) return;
    
    try {
      setIsCheckingNickname(true);
      
      const response = await api.post('/users/search/nickname', {
        name: userData.nickname
      });
      
      if (response.data.resultType === "FAIL" && response.data.error?.errorCode === "A025") {
        setIsNicknameVerified(false);
        setNicknameError(response.data.error.reason);
      } else if (response.data.resultType === "SUCCESS") {
        setIsNicknameVerified(true);
        setNicknameError("");
      }
    } catch (error: any) {
      setIsNicknameVerified(false);
      setNicknameError("닉네임 중복 확인에 실패했습니다.");
    } finally {
      setIsCheckingNickname(false);
    }
  };

  return (
    <div style={{width: "100%"}}>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="nickname">닉네임</Label>
        <HorizontalInputGroup>
          <InputField
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요."
            value={userData.nickname}
            onChange={handleNicknameChange}
          />
          <AuthButton
            disabled={!!errors.nickname || !userData.nickname || isCheckingNickname}
            fontSize="15px"
            onClick={handleCheckNickname}
          >
            {isCheckingNickname ? "확인 중..." : "중복 확인"}
          </AuthButton>
        </HorizontalInputGroup>
      </div>
      <ValidationMessage 
        type={isNicknameVerified ? "success" : undefined}
        message={
          isNicknameVerified 
            ? "사용 가능한 닉네임입니다." 
            : nicknameError || errors.nickname || " "
        }
        visible={isNicknameVerified || !!nicknameError || !!errors.nickname}
      />

      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="email">이메일</Label>
        <HorizontalInputGroup>
          <InputField
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={userData.email}
            onChange={(e) => {
              const value = e.target.value;
              setUserData(prev => ({ ...prev, email: value }));
              validateField("email", value, rules);
            }}
          />
          <AuthButton
            disabled={!!errors.email || !userData.email || isLoading.emailSend}
            fontSize="15px"
            onClick={handleSendVerificationCode}
          >
            {isLoading.emailSend ? "전송 중..." : "인증번호 받기"}
          </AuthButton>
        </HorizontalInputGroup>
      </div>
      <ValidationMessage 
        message={errors.email || " "}
        visible={!!errors.email}
      />

      <div style={{ marginBottom: "16px" }}>
        <Label htmlFor="verificationCode">인증번호</Label>
        <HorizontalInputGroup>
          <InputField
            type="text"
            name="verificationCode"
            placeholder="인증번호를 입력해주세요."
            value={userData.verificationCode}
            onChange={(e) => {
              const value = e.target.value;
              setUserData(prev => ({ ...prev, verificationCode: value }));
              validateField("verificationCode", value, rules);
            }}
          />
          <AuthButton
            disabled={!!errors.verificationCode || !userData.verificationCode || isLoading.emailVerify}
            onClick={handleVerifyCode}
            fontSize="15px"
          >
            {isLoading.emailVerify ? "확인 중..." : "인증하기"}
          </AuthButton>
        </HorizontalInputGroup>
      </div>

      <ValidationMessage 
        type={isEmailVerified ? "success" : undefined}
        message={
          isEmailVerified 
            ? "인증되었습니다." 
            : timeLeft > 0 
              ? `남은시간 ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}` 
              : errors.verificationCode || " "
        }
        visible={isEmailVerified || timeLeft > 0 || !!errors.verificationCode}
      />


      <div style={{width:"100%", display: "flex", justifyContent: "flex-end", marginTop: "20px"}}>
        <AuthButton
          onClick={onNext}
          disabled={
            !userData.nickname || 
            !userData.email || 
            !userData.verificationCode || 
            !isEmailVerified ||
            !isNicknameVerified ||
            Object.values(errors).some((error) => error !== "")
          }
          width="130px"
          fontSize="20px"
        >
          다음
        </AuthButton>
      </div>
    </div>
  );
};

export default RegisterStep1;
