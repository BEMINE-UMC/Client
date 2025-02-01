import React, { useState } from "react";
import InputField from "../InputField";
import Label from "../Label";
import ValidationMessage from "../ValidationMessage";
import AuthButton from "../AuthButton";
import api from "../../../api/axios";
import { isAxiosError } from "axios";
import useValidation from "../../../hooks/useValidation";

interface FindPasswordStep1Props {
  nickname: string;
  setNickname: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onNext: () => void;
}

interface CheckUserResponse {
  resultType: "SUCCESS" | "FAIL";
  error?: {
    errorCode: string;
    reason: string;
    data: any;
  };
}

const FindPasswordStep1: React.FC<FindPasswordStep1Props> = ({
  nickname,
  setNickname,
  email,
  setEmail,
  onNext,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { errors, validateField, validate } = useValidation();

  const validationRules = {
    nickname: (value: string) => {
      if (!value) return "닉네임을 입력해주세요.";
      return "";
    },
    email: (value: string) => {
      if (!value) return "이메일을 입력해주세요.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "올바른 이메일 형식이 아닙니다.";
      return "";
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid } = validate({ nickname, email }, validationRules);
    if (!isValid) return;

    try {
      setIsLoading(true);
      
      // 닉네임과 이메일이 유효한지 확인만 하고 Step2로 이동
      onNext();
      
    } catch (error) {
      if (isAxiosError(error)) {
        const errorData = error.response?.data;
        
        switch(errorData?.error?.errorCode) {
          case 'A021':
            validateField('nickname', nickname, {
              nickname: () => "존재하지 않는 닉네임입니다."
            });
            break;
          case 'A022':
            validateField('email', email, {
              email: () => "존재하지 않는 이메일입니다."
            });
            break;
          default:
            validateField('email', email, {
              email: () => errorData?.error?.reason || "사용자 확인에 실패했습니다."
            });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="nickname">닉네임</Label>
        <InputField
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            validateField("nickname", e.target.value, validationRules);
          }}
        />
        {errors.nickname && <ValidationMessage message={errors.nickname} />}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="email">이메일</Label>
        <InputField
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField("email", e.target.value, validationRules);
          }}
        />
        {errors.email && <ValidationMessage message={errors.email} />}
      </div>

      <div>
        <AuthButton
          type="submit"
          disabled={!nickname || !email || isLoading}
          fontSize="20px"
          width="552px"
        >
          {isLoading ? "확인중..." : "다음"}
        </AuthButton>
      </div>
    </form>
  );
};

export default FindPasswordStep1;
