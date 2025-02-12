import React, { useState } from "react";
import InputField from "../InputField";
import Label from "../Label";
import ValidationMessage from "../ValidationMessage";
import AuthButton from "../AuthButton";
import api from "../../../api/axios";
import { isAxiosError } from "axios";
import { ApiResponse, PasswordChangeData } from "../../../types/auth";

interface FindPasswordStep2Props {
  userId: number;
  onSuccess: () => void;
}

const FindPasswordStep2: React.FC<FindPasswordStep2Props> = ({
  userId,
  onSuccess,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validatePassword = (password: string) => {
    if (password.length < 4 || password.length > 15) {
      return "비밀번호는 4자 이상, 15자 이하여야 합니다.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // 기본 유효성 검사
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setErrors({ newPassword: passwordError });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "비밀번호가 일치하지 않습니다." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.patch<ApiResponse<PasswordChangeData>>('/users/search/password', {
        userId: userId,
        password: newPassword
      });

      if (response.data.resultType === "SUCCESS") {
        onSuccess();
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error('API 에러:', error);
      
      if (isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        
        switch(errorData.error?.errorCode) {
          case "A010":
            setErrors({ 
              newPassword: "비밀번호는 4자 이상, 15자 이하여야 합니다." 
            });
            break;
          case "A023":
            setErrors({ 
              newPassword: "새로운 비밀번호가 기존 비밀번호와 동일합니다." 
            });
            break;
          case "A024":
            setErrors({ 
              newPassword: "존재하지 않는 사용자입니다." 
            });
            break;
          default:
            setErrors({ 
              newPassword: errorData.error?.reason || "비밀번호 변경에 실패했습니다." 
            });
        }
      } else {
        setErrors({ 
          newPassword: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "15px" }}>
        <Label htmlFor="newPassword">새 비밀번호</Label>
        <InputField
          type="password"
          name="newPassword"
          placeholder="새 비밀번호를 입력해주세요."
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErrors({});
          }}
        />
      </div>
      <ValidationMessage 
          message={errors.newPassword || " "}
          visible={!!errors.newPassword}
        />
      <div style={{ marginBottom: "20px" }}>
        <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="새 비밀번호를 다시 입력해주세요."
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors({});
          }}
        />
      </div>
      <ValidationMessage 
          message={errors.confirmPassword || " "}
          visible={!!errors.confirmPassword}
        />
      <div>
        <AuthButton
          type="submit"
          disabled={!newPassword || !confirmPassword || isLoading}
          fontSize="20px"
          width="552px"
        >
          {isLoading ? "변경중..." : "비밀번호 재설정"}
        </AuthButton>
      </div>
    </form>
  );
};

export default FindPasswordStep2;
