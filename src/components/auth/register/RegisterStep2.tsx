import React from "react";
import Label from "../../../components/auth/Label";
import InputField from "../../../components/auth/InputField";
import ValidationMessage from "../../../components/auth/ValidationMessage";
import AuthButton from "../../../components/auth/AuthButton";

interface RegisterStep2Props {
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  onNext: () => void;
  validateField: (field: string, value: string, rules: any) => void;
  errors: Record<string, string>;
  getValidationRules: (step: number, password?: string) => any;
  isLoading: boolean;
}

const RegisterStep2: React.FC<RegisterStep2Props> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onNext,
  validateField,
  errors,
  getValidationRules,
  isLoading,
}) => {
  const rules = getValidationRules(2, password);

  const handleSubmit = () => {
    // Implement the logic to handle form submission
    onNext();
  };

  return (
    <div style={{width: "100%"}}>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="password">비밀번호</Label>
        <InputField
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            validateField("password", value, rules);
          }}
        />
      </div>
      <ValidationMessage 
        message={errors.password || " "}
        visible={!!errors.password}
      />
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력해주세요."
          value={confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmPassword(value);
            validateField("confirmPassword", value, rules);
          }}
        />
      </div>
      <ValidationMessage 
        message={errors.confirmPassword || " "}
        visible={!!errors.confirmPassword}
      />
      <div style={{width:"100%", display: "flex", justifyContent: "flex-end", marginTop: "20px"}}>
        <AuthButton
          onClick={handleSubmit}
          disabled={
            !password || 
            !confirmPassword || 
            Object.values(errors).some((error) => error !== "") ||
            isLoading
          }
          width="130px"
          height="65px"
          fontSize="20px"
        >
          {isLoading ? "가입중..." : "가입하기"}
        </AuthButton>
      </div>
    </div>
  );
};

export default RegisterStep2;
