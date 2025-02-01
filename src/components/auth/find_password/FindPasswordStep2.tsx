import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import Label from "../Label";
import ValidationMessage from "../ValidationMessage";
import AuthButton from "../AuthButton";
import api from "../../../api/axios";
import { isAxiosError } from "axios";

interface FindPasswordStep2Props {
  nickname: string;
  email: string;
}

const FindPasswordStep2: React.FC<FindPasswordStep2Props> = ({ nickname, email }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

    try {
      const requestData = {
        name: nickname,
        email: email,
        password: newPassword
      };

      console.log('비밀번호 변경 요청 데이터:', requestData);

      // API 요청 설정
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // PATCH 요청 보내기
      const response = await api.patch('/users/search/password', requestData, config);

      console.log('API 응답:', response.data);

      if (response.data.resultType === "SUCCESS") {
        // 성공 시 메시지 표시 및 로그인 페이지로 이동
        alert(response.data.success.message);  // "비밀번호가 변경되었습니다!"
        navigate("/login");
      } else {
        throw new Error('비밀번호 변경 실패');
      }
    } catch (error) {
      console.error('에러:', error);
      
      if (isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        
        // API 문서에 정의된 에러 코드에 따른 처리
        switch(errorData.error?.errorCode) {
          case "A010":
            setErrors({ newPassword: "비밀번호는 4자 이상, 15자 이하여야 합니다." });
            break;
          case "A021":
            setErrors({ newPassword: "존재하지 않는 닉네임입니다." });
            break;
          case "A022":
            setErrors({ newPassword: "존재하지 않는 이메일입니다." });
            break;
          case "A023":
            setErrors({ newPassword: "새로운 비밀번호가 기존 비밀번호와 동일합니다." });
            break;
          default:
            setErrors({ newPassword: errorData.error?.reason || "비밀번호 변경에 실패했습니다." });
        }
      } else {
        setErrors({ newPassword: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
      }
    }
  };

  return (
    <form onSubmit={handlePasswordChange}>
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
        {errors.newPassword && <ValidationMessage message={errors.newPassword} />}
      </div>

      <div style={{ marginBottom: "45px" }}>
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
        {errors.confirmPassword && <ValidationMessage message={errors.confirmPassword} />}
      </div>

      <AuthButton
        type="submit"
        disabled={!newPassword || !confirmPassword}
        fontSize="20px"
        width="100%"
      >
        비밀번호 변경
      </AuthButton>
    </form>
  );
};

export default FindPasswordStep2;
