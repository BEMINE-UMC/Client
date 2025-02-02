import React, { useState } from "react";
import FormContainer from "../../components/auth/FormContainer";
import TextLogo from "../../components/auth/TextLogo";
import FindEmailStep1 from "../../components/auth/find_email/FindEmailStep1";
import FindEmailStep2 from "../../components/auth/find_email/FindEmailStep2";
import FindEmailLinks from "../../components/auth/find_email/FindEmailLinks";
import AnimatedBackground from "../../components/common/AnimatedBackground";

const FindEmailPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [foundEmail, setFoundEmail] = useState("");

  const handleNext = (email: string) => {
    setFoundEmail(email);
    setStep(2);
  };

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
          <TextLogo />
          {step === 1 && (
            <FindEmailStep1
              nickname={nickname}
              setNickname={setNickname}
              password={password}
              setPassword={setPassword}
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <FindEmailStep2 
              nickname={nickname} 
              email={foundEmail} 
            />
          )}
          <FindEmailLinks />
        </FormContainer>
      </div>
    </>
  );
};

export default FindEmailPage;
