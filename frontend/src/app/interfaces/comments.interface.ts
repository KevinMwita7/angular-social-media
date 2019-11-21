export interface Comment {
    _id?: string;
    discussion_id: string;
    author_id: string;
    author_name: string;
    author_profilePic: string;
    text: string;
    repliesAmount?: number;
    likes?: number;
    dislikes?: number;
    liked?: boolean;
    disliked?: boolean;
    createdAt?: object;
}

export interface CommentReply {
    _id?: string;
    parent_id: string;
    author_id: string;
    author_name: string;
    author_profilePic: string;
    text: string;
    createdAt?: object;
}

export interface CommentReactionDetails {
    _id: string;
    likes: number;
    dislikes: number;
}
