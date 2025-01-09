import Empty from "../assets/images/main/Empty.png";

export const getImageOrDefault = (image: string): string => {
  return image || Empty;
};