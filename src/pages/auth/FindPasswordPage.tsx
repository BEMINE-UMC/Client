import React, { useState } from "react";
import FindPasswordStep1 from "../../components/auth/find_password/FindPasswordStep1";
import FindPasswordStep2 from "../../components/auth/find_password/FindPasswordStep2";
import FindPasswordStep3 from "../../components/auth/find_password/FindPasswordStep3";
import FindPasswordLinks from "../../components/auth/find_password/FindPasswordLinks";
import FormContainer from "../../components/auth/FormContainer";
import TextLogo from "../../components/auth/TextLogo";
import AnimatedBackground from "../../components/common/AnimatedBackground";

const FindPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <TextLogo 
            center={step === 3} 
            marginBottom={step === 3 ? "95px" : undefined}
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
            <FindPasswordStep2 
              nickname={nickname} 
              email={email} 
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && <FindPasswordStep3 />}
          {step !== 3 && <FindPasswordLinks />}
        </FormContainer>
      </div>
    </>
  );
};

export default FindPasswordPage;
