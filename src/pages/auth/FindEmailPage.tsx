// FindEmail.tsx
import React, { useState } from "react";
import FormContainer from "../../components/auth/FormContainer";
import InputField from "../../components/auth/InputField";
import ValidationMessage from "../../components/auth/ValidationMessage";
import AuthButton from "../../components/auth/AuthButton";
import Label from "../../components/auth/Label";
import LinkText from "../../components/auth/LinkText";
import HorizontalInputGroup from "../../components/auth/HorizontalInputGroup";

import BeMineLogo from "../../components/assets/icons/BeMine.svg";

const FindEmail: React.FC = () => {
  const [step, setStep] = useState(1); // 단계 상태 관리
  const [nickname, setNickname] = useState(""); // 닉네임 입력 상태
  const [password, setPassword] = useState(""); // 비밀번호 입력 상태
  const [email, setEmail] = useState("jangjimin778@gmail.com"); // 찾은 이메일 상태
  const [error, setError] = useState(""); // 에러 메시지 상태

  /**
   * 1단계: 닉네임과 비밀번호 입력 및 이메일 찾기
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
          onClick={() => {
            if (nickname === "장지민" && password === "jangjimin778") {
              setStep(2); // 이메일 찾기 성공 시 다음 단계로 이동
            } else {
              setError("해당 정보의 이메일이 존재하지 않습니다."); // 에러 메시지 설정
            }
          }}
          disabled={!nickname || !password} // 입력값이 없으면 버튼 비활성화
          fontSize="20px"
          width="552px"
        >
          이메일 찾기
        </AuthButton>
      </div>
    </>
  );

  /**
   * 2단계: 이메일 찾기 성공 메시지
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
        <div style={{ marginBottom: "20px" }}>{nickname} 님의 이메일은</div>
        <div style={{ fontSize: "20px", marginBottom: "30px" }}>    
            <span style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>{email}</span>
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

export default FindEmail;
