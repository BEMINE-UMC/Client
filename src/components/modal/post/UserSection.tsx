import React from "react";
import styled from "styled-components";

interface UserSectionProps {
  userImage: string;
  author: string;
  userInformation: string;
}

const UserSection: React.FC<UserSectionProps> = ({ userImage, author, userInformation }) => {
  return (
    <Wrapper>
      <UserImage src={userImage} alt={`${author}'s profile`} />
      <UserInfoWrapper>
        <ModalAuthor>{author}</ModalAuthor>
        <UserInformation>{userInformation}</UserInformation>
      </UserInfoWrapper>
    </Wrapper>
  );
};

export default UserSection;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  gap: 5%;
`;

const UserImage = styled.img`
  margin-top: 5%;
  margin-left: 5%;
  width: 300px;
  height: 300px;
  border-radius: 10px;

  @media (max-width: 480px) {
    margin: 0;
    width: 180px;
    height: 180px;
  }
`;

const UserInfoWrapper = styled.div`
  margin-top: 10%;
  gap: 15px;
  display: flex;
  flex-direction: column;
`;

const ModalAuthor = styled.h3`
  font-size: 50px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    margin-top: -25px;
    gap: 10px;
    font-size: 25px;
  }
`;

const UserInformation = styled.pre`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-left: 5%;

  @media (max-width: 480px) {
    margin-top: -20px;
    font-size: 5px;
  }
`;