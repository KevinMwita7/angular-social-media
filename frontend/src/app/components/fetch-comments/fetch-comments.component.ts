import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service';
import { CommentingSharedService } from '../../services/commenting-shared-service/commenting-shared-service.service';
import { Comment } from '../../interfaces/comments.interface';
import { Posts } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-fetch-comments',
  templateUrl: './fetch-comments.component.html',
  styleUrls: ['./fetch-comments.component.css']
})
export class FetchCommentsComponent implements OnInit {
  @Output() CommentsEmitter: EventEmitter<Array<Comment>> = new EventEmitter<Array<Comment>>();
  @Input() image: Posts;
  @Input() userId: string;
  @Input() commentsAmount: number;
  constructor(
    private commentService: CommentService,
    private commentRepliesSharedService: CommentingSharedService
    ) { }

  ngOnInit() { }
  fetchComments() {
    this.commentService.fetchComments(this.image._id, this.userId).subscribe((comments: Array<Comment>) => {
      this.CommentsEmitter.emit(comments);
      this.commentsAmount = comments === null ? 0 : comments.length;
      this.commentRepliesSharedService.startListeningForComments(true);
    }, err => {
      if (err) {
        console.error(err);
      }
    });
  }
}
