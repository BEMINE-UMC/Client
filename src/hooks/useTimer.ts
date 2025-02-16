// hooks/useTimer.ts
import { useState, useEffect } from "react";

// 타이머 관리를 위한 커스텀 훅
const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // 남은 시간
  const [timer, setTimer] = useState<number | null>(null); // 타이머 ID

  /**
   * 타이머 시작
   */
  const startTimer = () => {
    if (timer) return; // 중복 실행 방지
    setTimeLeft(initialTime);
    setTimer(setInterval(() => setTimeLeft((prev) => prev - 1), 1000));
  };

  /**
   * 타이머 중지
   */
  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0 && timer) {
      stopTimer();
    }
  }, [timeLeft, timer]);

  return { timeLeft, startTimer, stopTimer };
};

export default useTimer;
