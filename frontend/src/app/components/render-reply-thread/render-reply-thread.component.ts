import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { CommentService } from '../../services/comment/comment.service';
import { CommentReply } from '../../interfaces/comments.interface';
import { Comment } from '../../interfaces/comments.interface';
import { PaginatorService } from '../../services/paginator/paginator.service';

@Component({
  selector: 'app-render-reply-thread',
  templateUrl: './render-reply-thread.component.html',
  styleUrls: ['./render-reply-thread.component.css']
})
export class RenderReplyThreadComponent implements OnInit {
  @Input() parent: Comment;
  newReply: CommentReply;
  replies: Array<CommentReply> = [];
  repliesAmount: number;
  pager: any = {};
  pagedReplies: Array<CommentReply> = [];
  constructor(
    private commentService: CommentService,
    private paginator: PaginatorService
    ) { }

  ngOnInit() {
    this.repliesAmount = this.parent.repliesAmount;
  }

  renderReplies(replies: Array<CommentReply>) {
    this.replies = replies;
    this.setPage(1);
  }
  updateRepliesCount(newCount: number) {
    this.repliesAmount = newCount;
  }
  updateReply(reply: CommentReply) {
    if (reply && this.replies.length === 0) {
      this.commentService.fetchReplies(this.parent._id).subscribe((replies: Array<CommentReply>) => {
        this.replies = replies;
        this.repliesAmount = replies.length;
        // scroll to final page
        this.setPage(Math.ceil(replies.length / 10));
      });
    } else {
      this.replies.push(reply);
      // move on to the next page
      this.setPage(Math.ceil(this.replies.length / 10));
    }
   }
   setPage(pageNumber: number) {
    this.pager = this.paginator.getPager(this.repliesAmount, pageNumber);
    this.pagedReplies = this.replies.slice(this.pager.startIndex, this.pager.endIndex + 1);
   }
   getRelativeTime(ISOtime: string) {
    return moment(ISOtime).fromNow();
   }
}
