export interface Template {
    file?: string;
    templateCreatedAt: string;
    templateId: number;
    title: string;
    thumbnail: string;
    authorId: number;
    authorName: string;
    categoryId: number;
    categoryName: string;
    likedStatus?: boolean;  // 로그인 후에만 사용
    likesCount: number; // 아직 백엔드에 반영이 안됨(예상)
}