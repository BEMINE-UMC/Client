import React from "react";
import LinkText from "../LinkText";
import { RegisterStep3Props } from "../../../types/auth";

const RegisterStep3: React.FC<RegisterStep3Props> = ({ nickname }) => {
  return (
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
      <LinkText to="/login" fontSize="20px" bold={true} color="#707070">
        로그인 하러가기
      </LinkText>
    </div>
  );
};

export default RegisterStep3;
