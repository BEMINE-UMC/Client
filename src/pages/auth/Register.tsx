import React, { useState, useEffect } from "react";
import RegisterStep1 from "../../components/auth/register/RegisterStep1";
import RegisterStep2 from "../../components/auth/register/RegisterStep2";
import RegisterStep3 from "../../components/auth/register/RegisterStep3";
import FormContainer from "../../components/auth/FormContainer";
import TextLogo from "../../components/auth/TextLogo";
import useValidation from "../../hooks/useValidation";
import api from '../../api/axios';
import { isAxiosError } from 'axios';
import AnimatedBackground from '../../components/common/AnimatedBackground';

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
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);

  // 이메일 인증 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState({
    emailSend: false,
    emailVerify: false,
  });

  // 회원가입 응답 타입 수정
  interface SignupResponse {
    resultType: "SUCCESS" | "FAIL";
    error: {
      errorCode: string;
      reason: string;
      data: any;
    } | null;
    success: {
      userId: number;
      name: string;
      created_at: string;
    } | null;
  }

  // 타이머 작동
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(180);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const handleRegister = async () => {
    try {
      console.log('회원가입 요청 데이터:', { name: nickname, email, password });
      
      const response = await api.post<SignupResponse>('/users/signup', {
        name: nickname,
        email,
        password
      });

      console.log('회원가입 응답:', response.data);

      if (response.data.resultType === "SUCCESS" && response.data.success) {
        console.log('회원가입 성공!');
        localStorage.setItem('userId', response.data.success.userId.toString());
        localStorage.setItem('userName', response.data.success.name);
        setStep(3);
      }
    } catch (err: unknown) {
      const error = err as Error;
      
      console.error('회원가입 에러 상세:', {
        message: error.message,
        response: (error as any).response?.data,
        status: (error as any).response?.status,
        stack: error.stack
      });
      
      if (isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          alert('서버 응답 시간이 초과되었습니다.');
        } else {
          const errorMessage = error.response?.data?.error?.reason || '회원가입에 실패했습니다.';
          alert(errorMessage);
        }
      } else {
        alert('예기치 않은 오류가 발생했습니다.');
      }
    }
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
              setIsLoading={setIsLoading}
              onVerifySuccess={() => setIsEmailVerified(true)}
              setErrors={validateField}
              onVerifyCode={async (code: string) => {
                setIsEmailVerified(true);
                stopTimer();
                return Promise.resolve();
              }}
            />
          )}
          {step === 2 && (
            <RegisterStep2
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              onNext={handleRegister}
              validateField={validateField}
              errors={errors}
              getValidationRules={getValidationRules}
            />
          )}
          {step === 3 && <RegisterStep3 nickname={nickname} />}
        </FormContainer>
      </div>
    </>
  );
};

export default Register;
