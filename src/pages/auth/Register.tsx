import React, { useState, useEffect } from "react";
import RegisterStep1 from "../../components/auth/register/RegisterStep1";
import RegisterStep2 from "../../components/auth/register/RegisterStep2";
import RegisterStep3 from "../../components/auth/register/RegisterStep3";
import FormContainer from "../../components/auth/FormContainer";
import BeMineLogo from "../../assets/images/main/Logo_Text.svg";
import useValidation from "../../hooks/useValidation";

const Register: React.FC = () => {
  const { getValidationRules, validateField, errors } = useValidation();

  // 상태 관리
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 타이머 상태
  const [timeLeft, setTimeLeft] = useState(180); // 초기값 180초 (3분)
  const [timerActive, setTimerActive] = useState(false);

  // 이메일 인증 상태 추가
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState({
    emailSend: false,
    emailVerify: false,
  });

  // 타이머 작동
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(180); // 타이머 초기화
    setTimerActive(true); // 타이머 시작
  };

  const stopTimer = () => {
    setTimerActive(false); // 타이머 중지
  };

  // 이메일 인증 코드 전송 함수
  const handleSendVerificationCode = async (email: string) => {
    try {
      setIsLoading(prev => ({ ...prev, emailSend: true }));
      // TODO: API 호출 로직 구현
      await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 지연
      startTimer();
    } catch (error) {
      console.error('이메일 전송 실패:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, emailSend: false }));
    }
  };

  // 인증 코드 확인 함수
  const handleVerifyCode = async (code: string) => {
    try {
      setIsLoading(prev => ({ ...prev, emailVerify: true }));
      // TODO: API 호출 로직 구현
      await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 지연
      setIsEmailVerified(true);
    } catch (error) {
      console.error('인증 코드 확인 실패:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, emailVerify: false }));
    }
  };

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
            startTimer={startTimer}
            timeLeft={timeLeft}
            validateField={validateField}
            errors={errors}
            getValidationRules={getValidationRules}
            isEmailVerified={isEmailVerified}
            isLoading={isLoading}
            onSendVerificationCode={handleSendVerificationCode}
            onVerifyCode={handleVerifyCode}
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
            validateField={validateField}
            errors={errors}
            getValidationRules={getValidationRules}
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
        height: "calc(100vh - 5rem)",
        flexDirection: "column",
      }}
    >
      <img
        src={BeMineLogo}
        alt="BeMine Logo"
        style={{ display: "block", margin: "0 auto 96px"  }}
      />
      <FormContainer>{renderCurrentStep()}</FormContainer>
    </div>
  );
};

export default Register;
