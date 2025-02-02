import { useMediaQuery } from 'react-responsive';

// 브레이크포인트 상수 정의
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: {
    MIN: 481,
    MAX: 840,
  },
  DESKTOP: 841,
} as const;

// 반응형 타입 정의
export interface ResponsiveType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// 반응형 훅 생성
export const useResponsive = (): ResponsiveType => {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });
  const isTablet = useMediaQuery({
    minWidth: BREAKPOINTS.TABLET.MIN,
    maxWidth: BREAKPOINTS.TABLET.MAX,
  });
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.DESKTOP });

  return { isMobile, isTablet, isDesktop };
}; 