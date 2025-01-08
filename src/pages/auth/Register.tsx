// Register.tsx
import React, { useState } from "react";
import FormContainer from "../../components/common/FormContainer";
import InputField from "../../components/common/InputField";
import ValidationMessage from "../../components/common/ValidationMessage";
import HorizontalInputGroup from "../../components/common/HorizontalInputGroup";
import AuthButton from "../../components/common/AuthButton";
import Label from "../../components/common/Label";
import LinkText from "../../components/common/LinkText";
import useValidation from "../../hooks/useValidation";
import useTimer from "../../hooks/useTimer";
import BeMineLogo from "../../components/assets/icons/BeMine.svg";

const Register: React.FC = () => {
  const { errors, validate, validateField, getValidationRules } = useValidation();
  const { timeLeft, startTimer, stopTimer } = useTimer(180); // 3분 타이머

  const [step, setStep] = useState(1); // 단계별 상태 관리
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * 1단계: 닉네임, 이메일, 인증번호 입력
   */
  const renderStep1 = () => {
    const rules = getValidationRules(1);

    return (
      <>
        <div style={{ marginBottom: "15px" }}>
          <Label htmlFor="nickname">닉네임</Label>
          <InputField
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => {
              const value = e.target.value;
              setNickname(value);
              validateField("nickname", value, rules);
            }}
          />
        </div>
        {errors.nickname && <ValidationMessage message={errors.nickname} />}
        <div>
          <Label htmlFor="email">이메일</Label>
          <HorizontalInputGroup>
            <InputField
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                validateField("email", value, rules);
              }}
            />
            <AuthButton
              disabled={!!errors.email || !email}
              onClick={() => {
                startTimer(); // 타이머를 초기화
                console.log("인증번호 발송: 123456");
              }}
            >
              인증번호 받기
            </AuthButton>
          </HorizontalInputGroup>
          {errors.email && <ValidationMessage message={errors.email} />}
        </div>
        <div>
          <Label htmlFor="verificationCode">인증번호</Label>
          <HorizontalInputGroup>
            <InputField
              type="text"
              placeholder="인증번호를 입력해주세요."
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value;
                setVerificationCode(value);
                validateField("verificationCode", value, rules);
              }}
            />
            <AuthButton
              disabled={!!errors.verificationCode || !verificationCode}
              onClick={() => {
                if (verificationCode === "123456") {
                  console.log("인증 성공");
                } else {
                  console.log("인증 실패");
                }
              }}
            >
              인증
            </AuthButton>
          </HorizontalInputGroup>
          {errors.verificationCode && <ValidationMessage message={errors.verificationCode} />}
        </div>
        <div style={{ marginBottom: "10px" }}>
          {timeLeft > 0 ? (
            <p style={{ fontSize: "12px", color: "gray" }}>
              남은 시간: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </p>
          ) : (
            <ValidationMessage message="인증 시간이 초과되었습니다. 다시 시도하세요." />
          )}
        </div>

        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
          <AuthButton
            onClick={() => {
              const validation = validate(
                { nickname, email, verificationCode },
                rules
              );
              if (validation.isValid) setStep(2); // 유효성 검사를 통과하면 다음 단계로 이동
            }}
            disabled={
              !nickname ||
              !email ||
              !verificationCode ||
              Object.values(errors).some((error) => error !== "")
            }
          >
            다음
          </AuthButton>
        </div>
      </>
    );
  };

  /**
   * 2단계: 비밀번호 및 비밀번호 확인 입력
   */
  const renderStep2 = () => {
    const rules = getValidationRules(2, password);

    return (
      <>
        <div style={{ marginBottom: "15px" }}>
          <Label htmlFor="password">비밀번호</Label>
          <InputField
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              validateField("password", value, rules);
            }}
          />
          {errors.password && <ValidationMessage message={errors.password} />}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <InputField
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(value);
              validateField("confirmPassword", value, rules);
            }}
          />
        </div>
        {errors.confirmPassword && (
            <ValidationMessage message={errors.confirmPassword} />
        )}
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "20px" }}>
          <AuthButton
            onClick={() => setStep(3)}
            disabled={
              !password ||
              !confirmPassword ||
              Object.values(errors).some((error) => error !== "")
            }
          >
            다음
          </AuthButton>
        </div>
      </>
    );
  };

/**
 * 3단계: 회원가입 완료 메시지
 */
const renderStep3 = () => (
    <div
      style={{
        width:"100%",
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
    <div style={{ marginBottom: "112px" }}>
        <div style={{ marginBottom: "30px"}}>어서오세요</div>
        <div>
            <span style={{ fontSize: "32px", fontWeight: "bold",}}>{nickname}</span>
            <span>님! 로그인 후 BeMine을 즐겨보세요.</span>
        </div>     
    </div>
      <LinkText to="/login" fontSize="16px">
        로그인 하러가기
      </LinkText>
    </div>
  );
  

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
      <img src={BeMineLogo} alt="BeMine Logo" style={{ display: "block", margin: "0 auto 70px" }} />
      <FormContainer>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </FormContainer>
    </div>
  );
};

export default Register;
