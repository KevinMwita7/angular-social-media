export interface TextPost {
    id?: string;
    uploader_id: string;
    uploader: string;
    uploaderProfilePic?: string;
    title: string;
    description: string;
    likes?: number;
    liked?: boolean;
    likers?: object;
    commentsAmount?: number;
}