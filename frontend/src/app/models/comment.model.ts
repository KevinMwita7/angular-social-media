import { Comment, CommentReactionDetails } from '../interfaces/comments.interface';
export class CommentsModel {
    constructor(comment: Comment) {
        this.comment = comment;
    }
    private comment: Comment;
    public isLiked() {
        return this.comment.liked;
    }
    public isDisliked() {
        return this.comment.disliked;
    }
    public like() {
        this.comment.liked = true;
        ++this.comment.likes;
    }
    public unlike() {
        if (this.comment.likes > 0) {
            this.comment.liked = false;
            --this.comment.likes;
        }
    }
    public dislike() {
        this.comment.disliked = true;
        ++this.comment.dislikes;
    }
    public undislike() {
        if (this.comment.dislikes > 0) {
            this.comment.disliked = false;
            --this.comment.dislikes;
        }
    }
    updateLikesAndDislikes(newDetails: CommentReactionDetails) {
        if (this.comment._id === newDetails._id) {
            this.comment.likes = newDetails.likes;
            this.comment.dislikes = newDetails.dislikes;
        } else {
            return;
        }
    }
    public getCommentMemberVariable(): Comment {
        return this.comment;
    }
}
