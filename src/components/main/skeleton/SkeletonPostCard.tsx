import styled from "styled-components";


const SkeletonPostCard = () => {
    return (
        <Container>
            <Image/>
            <Content>
                <SkeletonText width="60%" />
                <SkeletonText width="80%" />
            </Content>
        </Container>
    );
};

export default SkeletonPostCard;

const Container = styled.div`
//   width: 200px;
//   height: 280px;
//   background: #e0e0e0;
//   border-radius: 10px;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
`;

const Image = styled.div`
//   width: 100%;
//   height: 60%;
//   background: #d6d6d6;
//   animation: pulse 1.5s infinite ease-in-out;
`;

const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 10px;
//   gap: 5px;
`;

const SkeletonText = styled.div<{ width: string }>`
//   width: ${({ width }) => width};
//   height: 10px;
//   background: #d6d6d6;
//   border-radius: 4px;
//   animation: pulse 1.5s infinite ease-in-out;
`;

