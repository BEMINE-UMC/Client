// FindPassword.tsx
import React, { useState } from "react";
import FormContainer from "../../components/auth/FormContainer";
import InputField from "../../components/auth/InputField";
import ValidationMessage from "../../components/auth/ValidationMessage";
import AuthButton from "../../components/auth/AuthButton";
import Label from "../../components/auth/Label";
import LinkText from "../../components/auth/LinkText";
import BeMineLogo from "../../assets/images/BeMine.svg";

const FindPassword: React.FC = () => {
  const [step, setStep] = useState(1); // 단계 상태 관리
  const [nickname, setNickname] = useState(""); // 닉네임 입력 상태
  const [email, setEmail] = useState(""); // 이메일 입력 상태
  const [password, setPassword] = useState("jangjimin77811!"); // 찾은 비밀번호 상태
  const [error, setError] = useState(""); // 에러 메시지 상태

  /**
   * 1단계: 닉네임과 이메일 입력 및 비밀번호 찾기
   */
  const renderStep1 = () => (
    <>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="nickname">닉네임</Label>
        <InputField
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setError(""); // 입력 시 에러 초기화
          }}
        />
      </div>
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
      {error && <ValidationMessage message={error} />}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "45px" }}>
        <AuthButton
          onClick={() => {
            if (nickname === "장지민" && email === "jangjimin778@gmail.com") {
              setStep(2); // 비밀번호 찾기 성공 시 다음 단계로 이동
            } else {
              setError("해당 닉네임의 가입 이메일이 존재하지 않습니다."); // 에러 메시지 설정
            }
          }}
          disabled={!nickname || !email} // 입력값이 없으면 버튼 비활성화
          fontSize="20px"
          width="552px"
        >
          비밀번호 찾기
        </AuthButton>
      </div>
    </>
  );

  /**
   * 2단계: 비밀번호 찾기 성공 메시지
   */
  const renderStep2 = () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <div style={{ marginBottom: "85px" }}>
        <div style={{ marginBottom: "20px" }}>{nickname} 님의 비밀번호는</div>
        <div style={{ fontSize: "20px", marginBottom: "30px" }}>    
            <span style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>{password}</span>
            <span> 입니다.</span>
        </div>
      </div>
      <LinkText to="/login" fontSize="20px" bold={true}>
        로그인 하러가기
      </LinkText>
    </div>
  );

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
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
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
          <LinkText to="/register" underline={false}>
            회원가입
          </LinkText>
        </div>
      </FormContainer>
    </div>
  );
};

export default FindPassword;
