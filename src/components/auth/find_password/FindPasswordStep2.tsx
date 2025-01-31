import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "./FindPassword.styles";
import InputField from "../InputField";
import Label from "../Label";
import ValidationMessage from "../ValidationMessage";
import AuthButton from "../AuthButton";
import LinkText from "../LinkText";
import api from "../../../api/axios";
import { isAxiosError } from "axios";
import useValidation from "../../../hooks/useValidation";

interface FindPasswordStep2Props {
  nickname: string;
  email: string;
}

interface ResetPasswordResponse {
  resultType: "SUCCESS" | "FAIL";
  error?: {
    errorCode: string;
    reason: string;
    data: any;
  };
  success?: {
    data: {
      userId: number;
    };
    message: string;
  };
}

const FindPasswordStep2: React.FC<FindPasswordStep2Props> = ({ nickname, email }) => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { errors, validateField, validate } = useValidation();

  const validationRules = {
    password: (value: string) => {
      if (!value) return "비밀번호를 입력해주세요.";
      if (value.length < 4) return "비밀번호는 최소 4자 이상 입력해야 합니다.";
      if (value.length > 15 || /\s/.test(value))
        return "비밀번호는 최대 15자 공백 없이 입력해주세요.";
      return "";
    },
    confirmPassword: (value: string) => {
      if (!value) return "비밀번호를 다시 입력해주세요.";
      return value !== passwords.password ? "비밀번호가 일치하지 않습니다." : "";
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value, validationRules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid } = validate(passwords, validationRules);
    if (!isValid) return;

    try {
      setIsLoading(true);
      const response = await api.patch<ResetPasswordResponse>('/users/search/password', {
        name: nickname,
        email,
        password: passwords.password
      });

      if (response.data.resultType === "SUCCESS") {
        alert(response.data.success?.message || "비밀번호가 성공적으로 재설정되었습니다.");
        navigate("/login");
      } else {
        validateField('password', passwords.password, {
          password: () => response.data.error?.reason || "비밀번호 재설정에 실패했습니다."
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const errorResponse = error.response?.data;
        validateField('password', passwords.password, {
          password: () => errorResponse?.error?.reason || "비밀번호 재설정 중 오류가 발생했습니다."
        });
      }
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StepContainer>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <Label htmlFor="password">비밀번호</Label>
          <InputField
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={passwords.password}
            onChange={handleChange}
          />
          
        </div>
        {errors.password && <ValidationMessage message={errors.password} />}
        <div style={{ marginBottom: "15px" }}>
          <Label htmlFor="confirmPassword">비밀번호 재설정 확인</Label>
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요."
            value={passwords.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errors.confirmPassword && <ValidationMessage message={errors.confirmPassword} />}
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          marginTop: "10px"
        }}>
          <AuthButton
            type="submit"
            disabled={!passwords.password || !passwords.confirmPassword || isLoading}
            fontSize="20px"
            width="552px"
          >
            로그인 하러 가기
          </AuthButton>
        </div>
      </form>
    </StepContainer>
  );
};

export default FindPasswordStep2;
