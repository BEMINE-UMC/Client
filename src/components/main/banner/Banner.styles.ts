import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  overflow: visible;
`;

export const BannerContainer = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
`;

export const BannerItem = styled.div`
  flex: 1 1 calc(33.333% - 24px);
  max-width: calc(33.333% - 24px);
  height: 250px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 24px);
    max-width: calc(50% - 24px);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

export const Image = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
`;

export const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const Author = styled.p`
  font-size: 14px;
  margin: 4px 0 0;
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(51, 51, 51, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(51, 51, 51, 1);
  }

  svg {
    color: #fff;
    font-size: 20px;
  }

  &:first-of-type {
    left: -60px;
  }

  &:last-of-type {
    right: -60px;
  }
`;