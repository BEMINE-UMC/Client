import React from "react";
import InputField from "../../../components/auth/InputField";
import ValidationMessage from "../../../components/auth/ValidationMessage";
import AuthButton from "../../../components/auth/AuthButton";
import Label from "../../../components/auth/Label";

interface RegisterStep2Props {
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  onNext: () => void;
}

const RegisterStep2: React.FC<RegisterStep2Props> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onNext,
}) => {
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<string>("");

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이어야 합니다.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleNext = () => {
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmPasswordValid) {
      onNext();
    }
  };

  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="password">비밀번호</Label>
        <InputField
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
        />
        {passwordError && <ValidationMessage message={passwordError} />}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <InputField
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError("");
          }}
        />
        {confirmPasswordError && <ValidationMessage message={confirmPasswordError} />}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <AuthButton onClick={handleNext} disabled={!password || !confirmPassword}>
          다음
        </AuthButton>
      </div>
    </>
  );
};

export default RegisterStep2;
