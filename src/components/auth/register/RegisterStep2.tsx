import React from "react";
import Label from "../Label";
import InputField from "../InputField";
import ValidationMessage from "../ValidationMessage";
import AuthButton from "../AuthButton";
import { RegisterStep2Props } from "../../../types/auth";

const RegisterStep2: React.FC<RegisterStep2Props> = ({
  userData,
  setUserData,
  onNext,
  validateField,
  errors,
  getValidationRules,
}) => {
  const rules = getValidationRules(2, userData.password);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="password">비밀번호</Label>
        <InputField
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={userData.password}
          onChange={(e) => {
            const value = e.target.value;
            setUserData(prev => ({ ...prev, password: value }));
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
          value={userData.confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setUserData(prev => ({ ...prev, confirmPassword: value }));
            validateField("confirmPassword", value, rules);
          }}
        />
      </div>
      <ValidationMessage
        message={errors.confirmPassword || " "}
        visible={!!errors.confirmPassword}
      />
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <AuthButton
          onClick={onNext}
          disabled={
            !userData.password ||
            !userData.confirmPassword ||
            Object.values(errors).some((error) => error !== "")
          }
          width="130px"
          fontSize="20px"
        >
          가입하기
        </AuthButton>
      </div>
    </div>
  );
};

export default RegisterStep2;
