import { Posts } from '../interfaces/posts.interface';
import { PostStats } from '../interfaces/posts.interface';

export class PostModel {
    _id: string;
    uploader: string;
    uploader_id: string;
    uploaderProfilePic: string;
    likes: number;
    price: number;
    title: string;
    description: string;
    liked: boolean;
    url: string;
    commentsAmount: number;
    createdAt: object;
    type: string;
    constructor(post: Posts) {
        this._id = post._id;
        this.uploader = post.uploader;
        this.uploader_id = post.uploader_id;
        this.uploaderProfilePic = post.uploaderProfilePic;
        this.likes = post.likes;
        this.title = post.title;
        this.description = post.description;
        this.url = post.url;
        this.createdAt = post.createdAt;
        this.liked = post.liked;
        this.commentsAmount = post.commentsAmount;
        this.type = post.type;
    }
    unlike() {
        --this.likes;
        this.liked = false;
    }
    like() {
        ++this.likes;
        this.liked = true;
    }
    isLiked() {
        return this.liked;
    }
    increaseCommentsAmount() {
        ++this.commentsAmount;
    }
    decreaseCommentsAmount() {
        --this.commentsAmount;
    }
    updateLikes(stats: PostStats) {
        if (stats._id === this._id) {
            this.likes = stats.likes;
        } else { return; }
    }
}
