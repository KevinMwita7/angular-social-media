import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentReply } from '../../interfaces/comments.interface';
import { CommentService } from '../../services/comment/comment.service';
import { ReplyingSharedService } from '../../services/replying-shared-service/replying-shared.service';

@Component({
  selector: 'app-fetch-comment-replies',
  templateUrl: './fetch-comment-replies.component.html',
  styleUrls: ['./fetch-comment-replies.component.css']
})
export class FetchCommentRepliesComponent implements OnInit {
  @Input() comment_id: string;
  @Input() repliesAmount: number;
  @Output() ReplyEmitter: EventEmitter<Array<CommentReply>> = new EventEmitter<Array<CommentReply>>();

  constructor(
    private commentService: CommentService,
    private replyingSharedService: ReplyingSharedService
    ) { }

  ngOnInit() {
  }
  fetchReplies() {
    this.replyingSharedService.startListeningForComments(true);
    this.commentService.fetchReplies(this.comment_id).subscribe((replies: Array<CommentReply>) => {
      this.repliesAmount = replies.length;
      this.ReplyEmitter.emit(replies);
    });
  }
}
