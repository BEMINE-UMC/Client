import React, { useState } from "react";
import FindPasswordStep1 from "../../components/auth/find_password/FindPasswordStep1";
import FindPasswordStep2 from "../../components/auth/find_password/FindPasswordStep2";
import FindPasswordStep3 from "../../components/auth/find_password/FindPasswordStep3";
import FindPasswordLinks from "../../components/auth/find_password/FindPasswordLinks";
import FormContainer from "../../components/auth/FormContainer";
import TextLogo from "../../components/auth/TextLogo";
import AnimatedBackground from "../../components/common/AnimatedBackground";

interface UserData {
  nickname: string;
  email: string;
  userId: number | null;
}

const FindPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    nickname: "",
    email: "",
    userId: null
  });

  const handleStep1Success = (verifiedUserId: number) => {
    setUserData(prev => ({ ...prev, userId: verifiedUserId }));
    setStep(2);
  };

  const StepComponents = {
    1: (
      <FindPasswordStep1
        nickname={userData.nickname}
        setNickname={(nickname) => setUserData(prev => ({ ...prev, nickname }))}
        email={userData.email}
        setEmail={(email) => setUserData(prev => ({ ...prev, email }))}
        onSuccess={handleStep1Success}
      />
    ),
    2: userData.userId && (
      <FindPasswordStep2 
        userId={userData.userId}
        onSuccess={() => setStep(3)}
      />
    ),
    3: <FindPasswordStep3 />
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
          <TextLogo 
            center={step === 3} 
            marginBottom={step === 3 ? "95px" : undefined}
          />
          {StepComponents[step as keyof typeof StepComponents]}
          {step !== 3 && <FindPasswordLinks />}
        </FormContainer>
      </div>
    </>
  );
};

export default FindPasswordPage;
