import styled, { keyframes } from "styled-components";

const SkeletonPostCard = () => {
    return (
        <Container>
            <SkeletonImage />
            <SkeletonContent>
                <SkeletonText width="60%" />
                <SkeletonText width="80%" />
            </SkeletonContent>
        </Container>
    );
};

export default SkeletonPostCard;

const pulse = keyframes`
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

const Container = styled.div`
  width: 16vw;
  aspect-ratio: 9 / 11;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${pulse} 1.5s infinite ease-in-out;

  @media (max-width: 768px) {
    width: 21vw;
  }

  @media (max-width: 480px) {
    width: 40vw;
  }

  @media (max-width: 376px) {
    width: 45vw;
  }

  @media (max-width: 321px) {
    width: 50vw;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 60%;
  background: #d6d6d6;
  border-radius: 12px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 5px;
`;

const SkeletonText = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 10px;
  background: #d6d6d6;
  border-radius: 4px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;