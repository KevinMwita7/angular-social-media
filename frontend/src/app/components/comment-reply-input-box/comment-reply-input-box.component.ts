import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentReply } from '../../interfaces/comments.interface';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProfilePicContainerService } from '../../services/profile-pic-container/profile-pic-container.service';
import { CommentReplySocketService } from '../../services/comment-reply-socket/comment-reply-socket.service';
import { ReplyingSharedService } from '../../services/replying-shared-service/replying-shared.service';
// tslint:disable-next-line: max-line-length
import { ShowCommentReplyInputBoxSharedService } from '../../services/show-comment-reply-input-box/show-comment-reply-input-box-shared.service';
@Component({
  selector: 'app-comment-reply-input-box',
  templateUrl: './comment-reply-input-box.component.html',
  styleUrls: ['./comment-reply-input-box.component.css']
})
export class CommentReplyInputBoxComponent implements OnInit {
  @Input() parent_id: string;
  @Output() newReply: EventEmitter<CommentReply> = new EventEmitter<CommentReply>();
  @Output() repliesCount: EventEmitter<number> = new EventEmitter<number>();
  showReplyInputBox = false;
  reply: CommentReply = {
    parent_id: '',
    author_id: '',
    author_name: '',
    author_profilePic: '',
    text: '',
  };

  constructor(private authService: AuthenticationService,
    public profilePicContainer: ProfilePicContainerService,
    private commentReplySocket: CommentReplySocketService,
    private replyingSharedService: ReplyingSharedService,
    private commentReplyInputBoxService: ShowCommentReplyInputBoxSharedService
    ) {
    this.newReply = new EventEmitter<CommentReply>();
  }

  ngOnInit() {
    this.initIoConnection();
    this.reply.parent_id = this.parent_id;
    this.reply.author_id = this.authService.getUserDetails()._id;
    this.reply.author_name = this.authService.getUserDetails().username;
    this.commentReplyInputBoxStatusObserver();
    this.profilePicContainer.getProfilePic().subscribe((profilePicUrl: string) => {
      this.reply.author_profilePic = profilePicUrl;
    });
  }

  public submitReply(reply) {
    if (reply.value) {
      this.reply.text = reply.value;
      this.replyingSharedService.startListeningForComments(true);
      this.commentReplySocket.submitReply(this.reply);
      reply.value = '';
    } else {
      return;
    }
  }
  private initIoConnection() {
    this.commentReplySocket.initSocket();
    this.commentReplySocket.onNewRepliesCount().subscribe((count: number) => {
      this.repliesCount.emit(count);
    });
    this.replyingSharedService.getListeningForRepliesStatus().subscribe((status: boolean) => {
      if (status) {
        this.commentReplySocket.onReply().subscribe((reply: CommentReply) => {
          this.newReply.emit(reply);
        });
      }
    });
  }
  private commentReplyInputBoxStatusObserver() {
    this.commentReplyInputBoxService.commentReplyInputBoxVisibility().subscribe((data: boolean) => {
      this.showReplyInputBox = data;
    });
  }
  private hideInputBox() {
    this.showReplyInputBox = false;
    this.commentReplyInputBoxService.showCommentReplyInputBox(false);
  }
}
