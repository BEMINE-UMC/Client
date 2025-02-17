import React, { useState, useEffect } from "react";
import RegisterStep1 from "../../components/auth/register/RegisterStep1";
import RegisterStep2 from "../../components/auth/register/RegisterStep2";
import RegisterStep3 from "../../components/auth/register/RegisterStep3";
import FormContainer from "../../components/auth/FormContainer";
import TextLogo from "../../components/auth/TextLogo";
import useValidation from "../../hooks/useValidation";
import api from '../../api/axios';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import { RegisterUserData, SignupResponse } from "../../types/auth";

const Register: React.FC = () => {
  const { getValidationRules, validateField, errors } = useValidation();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<RegisterUserData>({
    nickname: "",
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
  });

  const [timeLeft, setTimeLeft] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState({
    emailSend: false,
    emailVerify: false,
  });

  useEffect(() => {
    let timer: number;

    if (timeLeft > 0 && !isEmailVerified) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeLeft, isEmailVerified]);

  const startTimer = () => {
    setTimeLeft(300);
  };

  const handleRegister = async () => {
    try {
      const response = await api.post<SignupResponse>('/users/signup', {
        name: userData.nickname,
        email: userData.email,
        password: userData.password
      });

      if (response.data.resultType === "SUCCESS" && response.data.success) {
        localStorage.setItem('userId', response.data.success.userId.toString());
        localStorage.setItem('userName', response.data.success.name);
        setStep(3);
      }
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  const StepComponents = {
    1: (
      <RegisterStep1
        userData={userData}
        setUserData={setUserData}
        startTimer={startTimer}
        timeLeft={timeLeft}
        validateField={validateField}
        errors={errors}
        getValidationRules={getValidationRules}
        isEmailVerified={isEmailVerified}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onVerifySuccess={() => setIsEmailVerified(true)}
        onNext={() => setStep(2)}
      />
    ),
    2: (
      <RegisterStep2
        userData={userData}
        setUserData={setUserData}
        onNext={handleRegister}
        validateField={validateField}
        errors={errors}
        getValidationRules={getValidationRules}
      />
    ),
    3: (
      <RegisterStep3
        nickname={userData.nickname}
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
          <TextLogo
            center={step === 3}
            marginBottom={step === 3 ? "95px" : undefined}
          />
          {StepComponents[step as keyof typeof StepComponents]}
        </FormContainer>
      </div>
    </>
  );
};

export default Register;
