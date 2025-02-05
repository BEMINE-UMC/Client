import styled from 'styled-components';
import { BREAKPOINTS } from '../../hooks/useResponsive';

interface HorizontalInputGroupProps {
  /** 입력 필드와 버튼을 포함하는 자식 요소 */
  children: React.ReactNode;
}

/** 입력 필드와 버튼이 나란히 배치된 그룹 컴포넌트 */
const GroupContainer = styled.div`
  display: flex;
  width: 552px;
  align-items: center;
  gap: 10px; /* 데스크톱: 입력 필드와 버튼 간의 간격 */

  & > *:first-child {
    width: 412px; /* 데스크톱: 입력 필드 */
  }
  & > *:last-child {
    width: 130px; /* 데스크톱: 버튼 */
  }

  /* 모바일 반응형 */
  @media (max-width: ${BREAKPOINTS.MOBILE}px) {
    width: 100%;
    gap: 6px;  /* 모바일: 간격 6px */

    & > *:first-child {
      width: 320%;  /* 모바일: 입력 필드 80% */
    }
    & > *:last-child {
      width: 20%;  /* 모바일: 버튼 20% */
    }
  }

  /* 태블릿 반응형 */
  @media (min-width: ${BREAKPOINTS.TABLET.MIN}px) and (max-width: ${BREAKPOINTS.TABLET.MAX}px) {
    width: 100%;
    gap: 2px;  /* 태블릿: 간격 2px */

    & > *:first-child {
      width: 350%;  /* 태블릿: 입력 필드 80% */
    }
    & > *:last-child {
      width: 20%;  /* 태블릿: 버튼 20% */
    }
  }
`;

const HorizontalInputGroup: React.FC<HorizontalInputGroupProps> = ({ children }) => {
  return <GroupContainer>{children}</GroupContainer>;
};

export default HorizontalInputGroup;
