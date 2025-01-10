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
}) => {
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
      </div>
      <div>
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
      {errors.confirmPassword && <ValidationMessage message={errors.confirmPassword} />}

      <div style={{ width:"100%", display: "flex", justifyContent: "flex-end", marginTop: "20px"}}>
        <AuthButton
          onClick={onNext}
          disabled={!password || !confirmPassword || Object.values(errors).some((error) => error !== "")}
          width="143px"
          height="65px"
        >
          다음
        </AuthButton>
      </div>
    </>
  );
};

export default RegisterStep2;
