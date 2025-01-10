import React, { useState } from "react";
import FindPasswordStep1 from "../../components/auth/find_password/FindPasswordStep1";
import FindPasswordStep2 from "../../components/auth/find_password/FindPasswordStep2";
import FindPasswordLinks from "../../components/auth/find_password/FindPasswordLinks";
import FormContainer from "../../components/auth/FormContainer";
import BeMineLogo from "../../assets/images/BeMine.svg";

const FindPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("jangjimin77811!");

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
          <FindPasswordStep2 nickname={nickname} password={password} />
        )}
        <FindPasswordLinks />
      </FormContainer>
    </div>
  );
};

export default FindPasswordPage;
