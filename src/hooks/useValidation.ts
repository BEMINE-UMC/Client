// hooks/useValidation.ts
import { useState } from "react";

interface ValidationErrors {
  [key: string]: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

// 입력값 검증을 위한 커스텀 훅
const useValidation = () => {
    const [errors, setErrors] = useState<ValidationErrors>({});
  
    const validate = (
      fields: { [key: string]: any },
      rules: { [key: string]: (value: any) => string }
    ): ValidationResult => {
      const newErrors: ValidationErrors = {};
  
      for (const field in rules) {
        const error = rules[field](fields[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
  
      setErrors(newErrors);
  
      return {
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors,
      };
    };
  
    // 개별 필드 유효성 검사 함수
    const validateField = (field: string, value: any, rules: { [key: string]: (value: any) => string }) => {
      const error = rules[field]?.(value) || "";
      setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };
  
    const getValidationRules = (step: number, password?: string) => {
        const commonRules = {
          nickname: (value: string) => {
            if (!value) return "닉네임을 입력해주세요.";
            if (value.length > 15 || /\s/.test(value))
              return "닉네임은 최대 15자 공백 없이 입력해주세요.";
            if (value === "duplicated") return "중복되는 닉네임입니다.";
            return "";
          },
          email: (value: string) => {
            const pattern = /^[A-Za-z0-9_\.-]+@[A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
            if (!value) return "이메일을 입력해주세요.";
            return !pattern.test(value) ? "올바른 이메일을 작성해주세요." : "";
          },
          verificationCode: (value: string) => {
            if (!value) return "인증번호를 입력해주세요.";
            if (value === "invalid") return "인증번호가 올바르지 않습니다.";
            return "";
          },
        };

        const step2Rules = {
          password: (value: string) => {
            if (!value) return "비밀번호를 입력해주세요.";
            if (value.length < 4) return "비밀번호는 최소 4자 이상 입력해야 합니다.";
            if (value.length > 15 || /\s/.test(value))
              return "비밀번호는 최대 15자 공백 없이 입력해주세요.";
            return "";
          },
          confirmPassword: (value: string) => {
            if (!password) return ""; // password가 undefined인 경우 에러 메시지 반환하지 않음
            return value !== password ? "비밀번호가 일치하지 않습니다." : "";
          },
        };

        if (step === 1) return commonRules;
        if (step === 2) return step2Rules;
        return {};
      };
  
    return { errors, validate, validateField, getValidationRules };
  };
  
  export default useValidation;