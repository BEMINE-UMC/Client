import React, { useState, useEffect } from "react";
import RegisterStep1 from "../../components/auth/register/RegisterStep1";
import RegisterStep2 from "../../components/auth/register/RegisterStep2";
import RegisterStep3 from "../../components/auth/register/RegisterStep3";
import FormContainer from "../../components/auth/FormContainer";
import BeMineLogo from "../../assets/images/main/Logo_Text.svg";
import useValidation from "../../hooks/useValidation";
import api from '../../api/axios';
import { isAxiosError } from 'axios';

// 사용하지 않는 상수 제거


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
    setTimeLeft(180); // 타이머 초기화
    setTimerActive(true); // 타이머 시작
  };

  const stopTimer = () => {
    setTimerActive(false); // 타이머 중지
  };

  // 이메일 인증 코드 전송 함수 (임시 구현)
  const handleSendVerificationCode = async (email: string) => {
    try {
      setIsLoading(prev => ({ ...prev, emailSend: true }));
      await new Promise(resolve => setTimeout(resolve, 1000));
      startTimer();
      alert('인증 코드가 발송되었습니다. (테스트용: 코드는 "123456"입니다)');
    } catch (err: unknown) {
      const error = err as Error;
      console.error('이메일 전송 실패:', error.message);
    } finally {
      setIsLoading(prev => ({ ...prev, emailSend: false }));
    }
  };

  // 인증 코드 확인 함수 (임시 구현)
  const handleVerifyCode = async (code: string) => {
    try {
      setIsLoading(prev => ({ ...prev, emailVerify: true }));
      // 임시: 코드가 "123456"일 때만 성공
      await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 효과를 위한 지연
      
      if (code === "123456") {
        setIsEmailVerified(true);
        stopTimer();
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('잘못된 인증 코드입니다.');
      }
    } catch (error) {
      console.error('인증 코드 확인 실패:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, emailVerify: false }));
    }
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
      const error = err as Error;  // 기본 Error 타입으로 캐스팅
      
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
            onNext={handleRegister}
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
