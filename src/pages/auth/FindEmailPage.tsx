import React, { useState } from "react";
import FormContainer from "../../components/auth/FormContainer";
import BeMineLogo from "../../assets/images/main/Logo_Text.svg";
import FindEmailStep1 from "../../components/auth/find_email/FindEmailStep1";
import FindEmailStep2 from "../../components/auth/find_email/FindEmailStep2";
import FindEmailLinks from "../../components/auth/find_email/FindEmailLinks";
import AnimatedBackground from "../../components/common/AnimatedBackground";

const FindEmailPage: React.FC = () => {
  const [step, setStep] = useState(1); // 단계 상태 관리
  const [nickname, setNickname] = useState(""); // 닉네임 입력 상태
  const [password, setPassword] = useState(""); // 비밀번호 입력 상태
  const [email, setEmail] = useState("test@example.com"); // 찾은 이메일 상태

  return (
    <>
      <AnimatedBackground />
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
        <FormContainer>
          <img
            src={BeMineLogo}
            alt="BeMine Logo"
            style={{ 
              display: "block",
              marginBottom: "45px",
              marginLeft: "5px",
              width: "145px",
              height: "32px",
            }}
          />
          {step === 1 && (
            <FindEmailStep1
              nickname={nickname}
              setNickname={setNickname}
              password={password}
              setPassword={setPassword}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && <FindEmailStep2 nickname={nickname} email={email} />}
          <FindEmailLinks />
        </FormContainer>
      </div>
    </>
  );
};

export default FindEmailPage;
