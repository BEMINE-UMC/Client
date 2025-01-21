import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BackgroundContainer,
  SvgBackground,
  GradientOverlay,
  FormWrapper,
} from "./LoginForm.styles";
import FormContainer from "../../auth/FormContainer";
import InputField from "../../auth/InputField";
import ValidationMessage from "../../auth/ValidationMessage";
import AuthButton from "../../auth/AuthButton";
import Label from "../../auth/Label";
import LinkText from "../../auth/LinkText";
import BeMineLogo from "../../../assets/images/main/Logo_Text.svg";
import useValidation from "../../../hooks/useValidation";
import axios from "axios";

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
  const { errors, validateField, validate, getValidationRules } = useValidation();
  const navigate = useNavigate();

  const validationRules = {
    email: (value: string) => {
      if (!value) return "다시 입력해주세요.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "다시 입력해주세요.";
      return "";
    },
    password: (value: string) => {
      if (!value) return "다시 입력해주세요.";
      if (value.length < 4 || value.length > 15) {
        return "다시 입력해주세요.";
      }
      return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value, validationRules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid } = validate(formData, validationRules);
    if (!isValid) return;

    try {
      const response = await axios.post<LoginResponse>(
        'http://3.37.241.32:3000/users/login',
        {
          email: formData.email,
          password: formData.password
        }
      );

      if (response.data.resultType === "SUCCESS" && response.data.success) {
        // 토큰 저장
        localStorage.setItem('accessToken', response.data.success.accessToken);
        localStorage.setItem('refreshToken', response.data.success.refreshToken);
        
        // 홈 페이지로 이동
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        if (errorResponse?.error?.reason) {
          // 에러 메시지 표시
          validateField('email', formData.email, {
            email: () => errorResponse.error.reason
          });
        } else {
          validateField('email', formData.email, {
            email: () => "로그인에 실패했습니다."
          });
        }
      }
      console.error('Login error:', error);
    }
  };

  return (
    <BackgroundContainer>
      <SvgBackground />
      <GradientOverlay />
      <FormWrapper>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <span>
              <img
                src={BeMineLogo}
                alt="BeMine Logo"
                style={{
                  margin: "0 auto 45px",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              />
            </span>
            
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

            <div
              style={{
                marginTop: "45px",
              }}
            >
              <div>{errors.email && <ValidationMessage message={errors.email} />}</div>
              <AuthButton
                type="submit"
                disabled={!formData.email || !formData.password}
                fontSize="20px"
                width="552px"
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
              marginTop: "20px",
              gap: "10px",
              fontSize: "14px",
              width: "100%",
              color: "#B9B9B9",
            }}
          >
            <LinkText to="/find-email" underline={false}>
              이메일을 잊으셨나요?
            </LinkText>
            <span>|</span>
            <LinkText to="/find-password" underline={false}>
              비밀번호를 잊으셨나요?
            </LinkText>
            <span>|</span>
            <LinkText to="/register" underline={false}>
              회원가입
            </LinkText>
          </div>
        </FormContainer>
      </FormWrapper>
    </BackgroundContainer>
  );
};

export default LoginForm;
