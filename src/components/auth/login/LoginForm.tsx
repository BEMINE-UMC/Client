import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormWrapper,
} from "./LoginForm.styles";
import FormContainer from "../../auth/FormContainer";
import InputField from "../../auth/InputField";
import ValidationMessage from "../../auth/ValidationMessage";
import AuthButton from "../../auth/AuthButton";
import Label from "../../auth/Label";
import LinkText from "../../auth/LinkText";
import TextLogo from "../../auth/TextLogo";
import useValidation from "../../../hooks/useValidation";
import api from '../../../api/axios';
import { isAxiosError } from 'axios';
import { useAuthStore } from '../../../store/authStore';

// 로그인 응답 타입 정의
interface LoginResponse {
  resultType: "SUCCESS" | "FAIL";
  error: {
    errorCode: string;
    reason: string;
    data: any;
  } | null;
  success: {
    created_at: string;
    accessToken: string;
    refreshToken: string;
  } | null;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");  // 단일 에러 메시지로 변경
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (showError) {
      setError("");
      setShowError(false);
    }
  };

  const validateForm = () => {
    if (!formData.email) {
      setError("이메일을 입력해주세요.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    if (!formData.password) {
      setError("비밀번호를 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true);
    
    if (!validateForm()) return;

    try {
      const response = await api.post<LoginResponse>('/users/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.resultType === "SUCCESS" && response.data.success) {
        setLoggedIn(
          response.data.success.accessToken,
          response.data.success.refreshToken
        );
        navigate("/");
      }
    } catch (error) {
      setError("이메일 또는 비밀번호를 다시 입력해주세요.");
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <TextLogo />
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <Label htmlFor="email">이메일</Label>
            <InputField
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <Label htmlFor="password">비밀번호</Label>
            <InputField
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={formData.password}
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
              disabled={!formData.email || !formData.password}
              fontSize="20px"
              width="100%"
            >
              로그인
            </AuthButton>
          </div>
        </form>

        {/* 링크 섹션 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "27px",
            gap: "10px",
            fontSize: "14px",
            width: "100%",
            color: "#B9B9B9",
          }}
        >
          <LinkText to="/find-email" underline={false}>
            이메일을 잊으셨나요?
          </LinkText>
          <span style={{ margin: "0 10px" }}>|</span>
          <LinkText to="/find-password" underline={false}>
            비밀번호를 잊으셨나요?
          </LinkText>
          <span style={{ margin: "0 10px" }}>|</span>
          <LinkText to="/register" underline={false}>
            회원가입
          </LinkText>
        </div>
      </FormContainer>
    </FormWrapper>
  );
};

export default LoginForm;
