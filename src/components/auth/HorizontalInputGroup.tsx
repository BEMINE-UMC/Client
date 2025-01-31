import styled from 'styled-components';

interface HorizontalInputGroupProps {
  /** 입력 필드와 버튼을 포함하는 자식 요소 */
  children: React.ReactNode;
}

/** 입력 필드와 버튼이 나란히 배치된 그룹 컴포넌트 */
const GroupContainer = styled.div`
  display: flex;
  width:552px;
  align-items: center;
  gap: 10px; /* 입력 필드와 버튼 간의 간격 조정 */

  & > *:first-child {
    width:412px; /* 입력 필드 */
  }
  & > *:last-child {
    width: 130px; /* 버튼 */
  }
`;

const HorizontalInputGroup: React.FC<HorizontalInputGroupProps> = ({ children }) => {
  return <GroupContainer>{children}</GroupContainer>;
};

export default HorizontalInputGroup;
