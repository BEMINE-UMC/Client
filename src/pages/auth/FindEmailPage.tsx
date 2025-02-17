import React, { useState } from "react";
import FormContainer from "../../components/auth/FormContainer";
import TextLogo from "../../components/auth/TextLogo";
import FindEmailStep1 from "../../components/auth/find_email/FindEmailStep1";
import FindEmailStep2 from "../../components/auth/find_email/FindEmailStep2";
import FindEmailLinks from "../../components/auth/find_email/FindEmailLinks";
import AnimatedBackground from "../../components/common/AnimatedBackground";

interface UserData {
  nickname: string;
  password: string;
  foundEmail: string;
}

const FindEmailPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    nickname: "",
    password: "",
    foundEmail: ""
  });

  const handleEmailFound = (email: string) => {
    setUserData(prev => ({ ...prev, foundEmail: email }));
    setStep(2);
  };

  const StepComponents = {
    1: (
      <FindEmailStep1
        nickname={userData.nickname}
        setNickname={(nickname) => setUserData(prev => ({ ...prev, nickname }))}
        password={userData.password}
        setPassword={(password) => setUserData(prev => ({ ...prev, password }))}
        onNext={handleEmailFound}
      />
    ),
    2: (
      <FindEmailStep2 
        nickname={userData.nickname} 
        email={userData.foundEmail} 
      />
    )
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
          {StepComponents[step as keyof typeof StepComponents]}
          {step === 1 && <FindEmailLinks />}
        </FormContainer>
      </div>
    </>
  );
};

export default FindEmailPage;
