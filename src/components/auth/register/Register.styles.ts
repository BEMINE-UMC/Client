import styled from "styled-components";
import { BREAKPOINTS } from "../../../hooks/useResponsive";

/** RegisterStep1, RegisterStep2, RegisterStep3 공통 스타일 */
export const TimerMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 8px;
  
  span {
    font-weight: bold;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    font-size: 10px;
  }

  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    font-size: 10px;
  }
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: black;
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

/** 회원가입 프로그레스 바 스타일 */
export const StepProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
`;

export const StepIndicator = styled.div<{ active: boolean; completed: boolean }>`
  width: 32%;
  height: 4px;
  background-color: ${({ active, completed }) =>
    active || completed ? '#007AFF' : '#E5E5E5'};
  transition: background-color 0.3s ease;
`;

export const StepContent = styled.div<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateX(0)' : 'translateX(20px)')};
  transition: all 0.3s ease;
`;