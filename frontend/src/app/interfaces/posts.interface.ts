export interface Posts {
    _id ?: string;
    uploader: string;
    uploader_id: string;
    uploaderProfilePic: string;
    likes: number;
    title: string;
    description: string;
    url: string;
    commentsAmount: number;
    liked: boolean;
    createdAt: object;
    type: string;
}

export interface PostStats {
    _id: string;
    likes: number;
}
