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
import BeMineLogo from "../../../assets/images/main/Logo_Text.svg";
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
  const { errors, validateField, validate, getValidationRules } = useValidation();
  const navigate = useNavigate();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

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
      const requestData = {
        email: formData.email,
        password: formData.password
      };

      console.log('로그인 요청 데이터:', requestData);

      const response = await api.post<LoginResponse>('/users/login', requestData);

      console.log('로그인 응답:', response.data);

      if (response.data.resultType === "SUCCESS" && response.data.success) {
        console.log('로그인 성공! 토큰:', {
          accessToken: response.data.success.accessToken,
          refreshToken: response.data.success.refreshToken
        });

        setLoggedIn(
          response.data.success.accessToken,
          response.data.success.refreshToken
        );
        navigate("/");
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      
      if (isAxiosError(error)) {
        const errorResponse = error.response?.data;
        console.error('로그인 에러 응답:', errorResponse);

        if (errorResponse?.error?.reason) {
          validateField('email', formData.email, {
            email: () => errorResponse.error.reason
          });
        } else {
          validateField('email', formData.email, {
            email: () => "로그인에 실패했습니다."
          });
        }
      }
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <span>
            <img
              src={BeMineLogo}
              alt="BeMine Logo"
              style={{
                marginBottom: "45px", 
                marginLeft: "5px",
                display: "block",
                width: "145px",
                height: "32px",
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
          {errors.email && <ValidationMessage message={errors.email} />}
          <div style={{ marginTop: "20px" }}>     
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
