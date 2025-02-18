import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import ValidationMessage from "../ValidationMessage";
import AuthButton from "../AuthButton";
import Label from "../Label";
import TextLogo from "../TextLogo";
import api from '../../../api/axios';
import { useAuthStore } from '../../../store/authStore';
import { LoginResponse } from "../../../types/auth";
import LoginLinks from "./LoginLinks";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
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
    <>
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
      <LoginLinks />
    </>
  );
};

export default LoginForm;
