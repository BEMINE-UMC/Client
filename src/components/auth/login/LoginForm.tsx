import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../auth/FormContainer";
import InputField from "../../auth/InputField";
import ValidationMessage from "../../auth/ValidationMessage";
import AuthButton from "../../auth/AuthButton";
import Label from "../../auth/Label";
import LinkText from "../../auth/LinkText";
import BeMineLogo from "../../../assets/images/main/Logo_Text.svg";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 로그인 실패 메시지
  const navigate = useNavigate();

  // 로그인 처리 함수
  const handleLogin = () => {
    if (email === "test@example.com" && password === "password123") {
      console.log("로그인 성공");
      navigate("/"); // 루트 페이지로 이동
    } else {
      setError("다시 입력해주세요.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "calc(100vh - 5rem)",
        flexDirection: "column",
      }}
    >
      <img
        src={BeMineLogo}
        alt="BeMine Logo"
        style={{ display: "block", margin: "0 auto 96px" }}
      />
      <FormContainer>
        {/* 이메일 입력 */}
        <div style={{ marginBottom: "15px" }}>
          <Label htmlFor="email">이메일</Label>
          <InputField
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // 입력 시 에러 초기화
            }}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div style={{ marginBottom: "15px" }}>
          <Label htmlFor="password">비밀번호</Label>
          <InputField
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); // 입력 시 에러 초기화
            }}
          />
        </div>

        {/* 에러 메시지 */}
        {error && <ValidationMessage message={error} />}

        {/* 로그인 버튼 */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "45px" }}>
          <AuthButton
            onClick={handleLogin}
            disabled={!email || !password}
            fontSize="20px"
            width="552px"
          >
            로그인
          </AuthButton>
        </div>

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
    </div>
  );
};

export default LoginForm;
