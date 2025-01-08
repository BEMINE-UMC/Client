import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가
import FormContainer from "../../components/common/FormContainer";
import InputField from "../../components/common/InputField";
import ValidationMessage from "../../components/common/ValidationMessage";
import AuthButton from "../../components/common/AuthButton";
import Label from "../../components/common/Label";
import LinkText from "../../components/common/LinkText";
import BeMineLogo from "../../components/assets/icons/BeMine.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 로그인 실패 메시지
  const navigate = useNavigate(); // useNavigate 사용

  const handleLogin = () => {
    // 로그인 API 호출 (추후 연결)
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
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <img
        src={BeMineLogo}
        alt="BeMine Logo"
        style={{ display: "block", margin: "0 auto 96px" }}
      />
      <FormContainer>
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
        {error && <ValidationMessage message={error} />}

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

        <div
          style={{
            display: "flex",
            justifyContent: "center", // 링크 섹션을 가운데 정렬
            alignItems: "center",
            marginTop: "20px",
            gap: "10px", // 링크와 구분자 간격 설정
            fontSize: "14px",
            width: "100%",
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

export default Login;
