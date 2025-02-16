import React, { useState } from "react";
import InputField from "../../auth/InputField";
import ValidationMessage from "../../auth/ValidationMessage";
import AuthButton from "../../auth/AuthButton";
import Label from "../../auth/Label";
import { StepContainer } from "./FindEmail.styles";
import api from "../../../api/axios";
import { isAxiosError } from "axios";

interface FindEmailStep1Props {
  nickname: string;
  setNickname: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onNext: (email: string) => void;
}

const FindEmailStep1: React.FC<FindEmailStep1Props> = ({
  nickname,
  setNickname,
  password,
  setPassword,
  onNext,
}) => {
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'nickname') {
      setNickname(value);
    } else if (name === 'password') {
      setPassword(value);
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

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleFindEmail = async () => {
    setShowError(true);
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await api.patch('/users/search/email', {
        name: nickname,
        password: password
      });

      if (response.data.resultType === "SUCCESS") {
        const { email } = response.data.success;
        onNext(email);
      } else {
        setError("이메일 찾기에 실패했습니다.");
      }
    } catch (error) {
      setError("해당 정보의 이메일이 존재하지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StepContainer>
      <div style={{marginBottom: "15px"}}>
        <Label htmlFor="nickname">닉네임</Label>
        <InputField
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={handleChange}
        />
      </div>
      
      <div style={{marginBottom: "15px"}}>
        <Label htmlFor="password">비밀번호</Label>
        <InputField
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handleChange}
        />
      </div>
      <ValidationMessage 
        message={error || " "}
        visible={showError && !!error}
      />
      
      <AuthButton 
        width="100%" 
        onClick={handleFindEmail} 
        disabled={!nickname || !password || isLoading}
        fontSize="20px"
      >
        {isLoading ? "확인중..." : "이메일 찾기"}
      </AuthButton>
    </StepContainer>
  );
};

export default FindEmailStep1;
