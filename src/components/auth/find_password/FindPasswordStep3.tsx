import React from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "../AuthButton";

const FindPasswordStep3: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontSize: "24px", width:"100%", textAlign: "center"}}>
      <p style={{ marginBottom: "20px" }}>
        비밀번호가 재설정 되었습니다!
      </p>
      <p style={{ marginBottom: "100px"}}>
        로그인 후 BeMine을 즐겨보세요.
      </p>
      <AuthButton
        type="button"
        onClick={() => navigate("/login")}
        fontSize="20px"
        width="100%"
        height="65px"
      >
        로그인 하러가기
      </AuthButton>
    </div>
  );
};

export default FindPasswordStep3;
