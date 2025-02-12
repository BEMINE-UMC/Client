import React, { useState } from "react";
import InputField from "../InputField";
import Label from "../Label";
import ValidationMessage from "../ValidationMessage";
import AuthButton from "../AuthButton";
import api from "../../../api/axios";
import { isAxiosError } from "axios";
import { ApiResponse, UserVerificationData } from "../../../types/auth";

interface FindPasswordStep1Props {
  nickname: string;
  setNickname: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onSuccess: (userId: number) => void;
}

const FindPasswordStep1: React.FC<FindPasswordStep1Props> = ({
  nickname,
  setNickname,
  email,
  setEmail,
  onSuccess,
}) => {
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'nickname') {
      setNickname(value);
    } else if (name === 'email') {
      setEmail(value);
    }

    if (showError) {
      setError("");
      setShowError(false);
    }
  };

  const validateForm = () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return false;
    }

    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true);
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await api.post<ApiResponse<UserVerificationData>>('/users/search/data', {
        name: nickname,
        email: email
      });

      if (response.data.resultType === "SUCCESS" && response.data.success) {
        onSuccess(response.data.success.data.userId);
      } else {
        setError("해당 닉네임의 가입 이메일이 존재하지 않습니다.");
      }
    } catch (error) {
      setError("해당 닉네임의 가입 이메일이 존재하지 않습니다.");
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
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="email">이메일</Label>
        <InputField
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleChange}
        />
      </div>
      <ValidationMessage 
        message={error || " "}
        visible={showError && !!error}
      />

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
