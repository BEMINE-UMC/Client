import React from "react";
import LoginForm from "../../components/auth/login/LoginForm";
import AnimatedBackground from "../../components/common/AnimatedBackground";

const Login: React.FC = () => {
  return (
    <>
      <AnimatedBackground />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "calc(100vh - 5rem)",
          flexDirection: "column",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
};

export default Login;