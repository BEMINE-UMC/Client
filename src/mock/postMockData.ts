export interface Post {
    image: string;
    author: string;
    description: string;
    liked: boolean;
    category: string;
    likesCount: number;
  }
  
export const postMockData: Post[] = [
    {
      image: "",
      author: "카이",
      description: "Sample 1",
      liked: false,
      category: "콘텐츠 마케터",
      likesCount: 1,
    },
    {
      image: "",
      author: "유메",
      description: "Sample 2",
      liked: true,
      category: "브랜드 마케터",
      likesCount: 2,
    },
    {
      image: "",
      author: "윤슬",
      description: "Sample 3",
      liked: false,
      category: "퍼포먼스 마케터",
      likesCount: 3,
    },
    {
      image: "",
      author: "궁둔",
      description: "Sample 4",
      liked: false,
      category: "바이럴 마케터",
      likesCount: 4,
    },
  ];