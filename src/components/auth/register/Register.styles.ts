import styled from "styled-components";

/** RegisterStep1, RegisterStep2, RegisterStep3 공통 스타일 */
export const TimerMessage = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: gray;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 112px;
  font-size: 20px;
`;

export const Nickname = styled.span`
  font-size: 32px;
  font-weight: bold;
  margin: 10px 0;
`;

export const SubMessage = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

/** RegisterStep2 스타일 */
export const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
`;

/** RegisterStep3 스타일 */
export const LoginLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
