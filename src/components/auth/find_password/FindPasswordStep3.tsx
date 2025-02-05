import React from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "../AuthButton";

const FindPasswordStep3: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>
        비밀번호가 재설정 되었습니다!
      </h2>
      <h2 style={{ marginBottom: "50px"}}>
        로그인 후 BeMine을 즐겨보세요.
      </h2>
      <AuthButton
        type="button"
        onClick={() => navigate("/login")}
        fontSize="20px"
        width="100%"
      >
        로그인 하러가기
      </AuthButton>
    </div>
  );
};

export default FindPasswordStep3;
