export interface Post {
    postCreatedAt: string;
    postId: number;
    title: string;
    thumbnail: string;
    authorId: number;
    authorName: string;
    categoryId: number;
    categoryName: string;
    likedStatus?: boolean;
    scrapStatus?: boolean;
    likesCount: number;
    content?: string;  // 추가: 게시물 내용
    userImage?: string;  // 추가: 사용자 이미지 URL
    userInformation?: string;  // 추가: 사용자 정보
    body?: string;
  }