import { Component, OnInit, Input } from '@angular/core';
import { Comment, CommentReactionDetails } from '../../interfaces/comments.interface';
import { CommentsModel } from '../../models/comment.model';
import { CommentService } from '../../services/comment/comment.service';
import { CommentActionsSocketService } from '../../services/comment-actions/comment-actions-socket.service';
// tslint:disable-next-line: max-line-length
import { ShowCommentReplyInputBoxSharedService } from '../../services/show-comment-reply-input-box/show-comment-reply-input-box-shared.service';

@Component({
  selector: 'app-comment-actions',
  templateUrl: './comment-actions.component.html',
  styleUrls: ['./comment-actions.component.css']
})
export class CommentActionsComponent implements OnInit {
  @Input() comment: Comment;
  @Input() reactorId: string;
  private commentInputBoxVisible = false;
  public CommentModel: CommentsModel;
  constructor(
    private commentService: CommentService,
    private commentActionsSocket: CommentActionsSocketService,
    private commentReplyInputBox: ShowCommentReplyInputBoxSharedService
  ) { }

  ngOnInit() {
    this.CommentModel = new CommentsModel(this.comment);
    this.initIOConnections();
    this.CommentReplyInputBoxStatusObserver();
  }
  like() {
    if (!this.CommentModel.isLiked()) {
      this.CommentModel.undislike();
      this.CommentModel.like();
      this.commentService.likeComment(this.comment._id, this.reactorId).subscribe();
    } else {
      return;
    }
  }
  dislike() {
    if (!this.CommentModel.isDisliked()) {
      this.CommentModel.unlike();
      this.CommentModel.dislike();
      this.commentService.dislikeComment(this.comment._id, this.reactorId).subscribe();
    } else {
      return;
    }
  }
  private initIOConnections() {
    this.commentActionsSocket.initSocket();
    this.commentActionsSocket.onCommentLiked().subscribe((data: CommentReactionDetails) => {
      this.CommentModel.updateLikesAndDislikes(data);
    });
    this.commentActionsSocket.onCommentDisliked().subscribe((data: CommentReactionDetails) => {
      this.CommentModel.updateLikesAndDislikes(data);
    });
  }
  showReplyInputBox() {
    this.commentReplyInputBox.showCommentReplyInputBox(!this.commentInputBoxVisible);
  }
  private CommentReplyInputBoxStatusObserver() {
    this.commentReplyInputBox.commentReplyInputBoxVisibility().subscribe((data: boolean) => {
      this.commentInputBoxVisible = data;
    });
  }
}
