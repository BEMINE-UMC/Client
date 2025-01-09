// Register.tsx
import React, { useState } from "react";
import RegisterStep1 from "../../components/auth/register/RegisterStep1";
import RegisterStep2 from "../../components/auth/register/RegisterStep2";
import RegisterStep3 from "../../components/auth/register/RegisterStep3";
import FormContainer from "../../components/auth/FormContainer";
import BeMineLogo from "../../assets/images/BeMine.svg";

const Register: React.FC = () => {
  // 상태 관리
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 단계 렌더링
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <RegisterStep1
            nickname={nickname}
            setNickname={setNickname}
            email={email}
            setEmail={setEmail}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <RegisterStep2
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return <RegisterStep3 nickname={nickname} />;
      default:
        return null;
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
        style={{ display: "block", margin: "0 auto 70px" }}
      />
      <FormContainer>{renderCurrentStep()}</FormContainer>
    </div>
  );
};

export default Register;
