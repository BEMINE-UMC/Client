// API 응답 타입
export interface ApiResponse<T> {
  resultType: "SUCCESS" | "FAIL";
  error: {
    errorCode: string;
    reason: string;
    data: any;
  } | null;
  success: {
    data: T;
    message: string;
  } | null;
}

// Step1 응답 데이터 타입
export interface UserVerificationData {
  userId: number;
}

// Step2 응답 데이터 타입
export interface PasswordChangeData {
  userId: number;
} 