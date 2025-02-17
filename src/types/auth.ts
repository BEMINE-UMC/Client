// API 응답 타입
export interface ApiError {
  errorCode: string;
  reason: string;
  data: any;
}

export interface ApiResponse<T> {
  resultType: "SUCCESS" | "FAIL";
  error: ApiError | null;
  success: T | null;
}

// Step1 응답 데이터 타입
export interface UserVerificationData {
  data: {
    userId: number;
  };
}

// Step2 응답 데이터 타입
export interface PasswordChangeData {
  userId: number;
}

export interface LoginResponse {
  resultType: "SUCCESS" | "FAIL";
  error: ApiError | null;
  success: {
    created_at: string;
    accessToken: string;
    refreshToken: string;
  } | null;
}

export interface SignupResponse {
  resultType: "SUCCESS" | "FAIL";
  error: ApiError | null;
  success: {
    userId: number;
    name: string;
  } | null;
}

export interface EmailVerificationResponse {
  resultType: "SUCCESS" | "FAIL";
  error: ApiError | null;
  success: {
    message: string;
  } | null;
}

export interface RegisterUserData {
  nickname: string;
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterStepProps {
  userData: RegisterUserData;
  setUserData: React.Dispatch<React.SetStateAction<RegisterUserData>>;
}

export interface RegisterStep1Props extends RegisterStepProps {
  startTimer: () => void;
  timeLeft: number;
  validateField: (field: string, value: string, rules: any) => void;
  errors: Record<string, string>;
  getValidationRules: (step: number) => any;
  isEmailVerified: boolean;
  isLoading: {
    emailSend: boolean;
    emailVerify: boolean;
  };
  setIsLoading: React.Dispatch<React.SetStateAction<{
    emailSend: boolean;
    emailVerify: boolean;
  }>>;
  onVerifySuccess: () => void;
  onNext: () => void;
}

export interface RegisterStep2Props extends RegisterStepProps {
  onNext: () => void;
  validateField: (field: string, value: string, rules: any) => void;
  errors: Record<string, string>;
  getValidationRules: (step: number, password?: string) => any;
}

export interface RegisterStep3Props {
  nickname: string;
} 