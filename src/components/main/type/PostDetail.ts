export interface PostDetail {
    title: string;
    body: any;
    createdAt: string;
    updatedAt: string;
    liked: boolean;

    postCreatedAt: string;
    postId: number;
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
}