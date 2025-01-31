import React, { useState } from "react";
import FindPasswordStep1 from "../../components/auth/find_password/FindPasswordStep1";
import FindPasswordStep2 from "../../components/auth/find_password/FindPasswordStep2";
import FindPasswordLinks from "../../components/auth/find_password/FindPasswordLinks";
import FormContainer from "../../components/auth/FormContainer";
import BeMineLogo from "../../assets/images/main/Logo_Text.svg";
import AnimatedBackground from "../../components/common/AnimatedBackground";

const FindPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123!");

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
            <FindPasswordStep1
              nickname={nickname}
              setNickname={setNickname}
              email={email}
              setEmail={setEmail}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <FindPasswordStep2 nickname={nickname} email={email} />
          )}
          <FindPasswordLinks />
        </FormContainer>
      </div>
    </>
  );
};

export default FindPasswordPage;
