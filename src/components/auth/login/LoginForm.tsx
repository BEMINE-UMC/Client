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

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { errors, validateField, validate, getValidationRules } = useValidation();
  const navigate = useNavigate();

  const validationRules = {
    ...getValidationRules(2) // password 규칙 가져오기
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
      // 임시 로직 (API 연동 전)
      if (formData.email === "test@example.com" && formData.password === "password123") {
        navigate("/");
      } else {
        validateField('email', formData.email, {
          email: () => "이메일 또는 비밀번호가 올바르지 않습니다."
        });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      validateField('email', formData.email, {
        email: () => "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      });
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

            {errors.email && <ValidationMessage message={errors.email} />}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "45px",
              }}
            >
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
