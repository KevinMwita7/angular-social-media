import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../interfaces/comments.interface';
import { Posts } from '../../interfaces/posts.interface';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProfilePicContainerService } from '../../services/profile-pic-container/profile-pic-container.service';
import { CommentSocketService } from '../../services/comment-socket/comment-socket.service';
import { CommentingSharedService } from '../../services/commenting-shared-service/commenting-shared-service.service';

@Component({
  selector: 'app-comments-input-box',
  templateUrl: './comments-input-box.component.html',
  styleUrls: ['./comments-input-box.component.css']
})
export class CommentsInputBoxComponent implements OnInit {
  @Input() image: Posts;
  @Output() recentComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() commentsAmount: EventEmitter<object> = new EventEmitter<object>();
  comment: Comment = {
    discussion_id: '',
    author_id: '',
    author_name: '',
    author_profilePic: '',
    text: '',
  };
  constructor(
    private AuthService: AuthenticationService,
    private profilePicContainer: ProfilePicContainerService,
    private commentSocket: CommentSocketService,
    private commentRepliesSharedService: CommentingSharedService
    ) { }

  ngOnInit() {
    this.initIoConnection();
    this.comment.author_id = this.AuthService.getUserDetails()._id;
    this.comment.author_name = this.AuthService.getUserDetails().username;
    this.comment.discussion_id = this.image._id;
    this.profilePicContainer.getProfilePic().subscribe((profilePic: string) => {
      this.comment.author_profilePic = profilePic;
    });
  }

  public submitComment(comment) {
    if (comment.value) {
    this.comment.text = comment.value;
    this.commentRepliesSharedService.startListeningForComments(true);
    this.commentSocket.submitComment(this.comment);
    comment.value = '';
    } else {
      return;
    }
  }
  private initIoConnection() {
    this.commentSocket.initSocket();
    this.commentSocket.onNewCommentsCount().subscribe((count: object) => {
      this.commentsAmount.emit(count);
    });
    this.commentRepliesSharedService.getListenForCommentsStatus().subscribe((status: boolean) => {
      if (status) {
        this.commentSocket.onComment().subscribe((response: Comment) => {
          if (this.image._id === response.discussion_id) {
            this.recentComment.emit(response);
          }
        });
      }
    });
  }
}
