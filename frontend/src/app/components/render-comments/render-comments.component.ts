import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { CommentService } from '../../services/comment/comment.service';

import { Comment } from '../../interfaces/comments.interface';
import { Posts } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-render-comments',
  templateUrl: './render-comments.component.html',
  styleUrls: ['./render-comments.component.css']
})
export class RenderCommentsComponent implements OnInit {
  @Input() image: Posts;
  @Input() reactorId: string;
  comments: Array<Comment> = [];
  loadComments = false;
  commentsAmount: number;

  constructor(
    private commentService: CommentService
    ) { }

  ngOnInit() {
    this.commentsAmount = this.image.commentsAmount;
  }
  renderComments(comments: Array<Comment>) {
    this.comments = comments;
  }
  updateCommentsCount(count: object) {
    if (count['image_id'] === this.image._id) {
      this.commentsAmount = count['commentsAmount'];
    }
  }
  recentComment(cmt: Comment) {
    if (cmt && this.comments.length === 0) {
      this.commentService.fetchComments(this.image._id, this.reactorId).subscribe((comments: Array<Comment>) => {
        this.comments = comments;
      }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      this.comments.push(cmt);
    }
  }
  getRelativeTime(time: string) {
    return moment(time).fromNow();
  }
}
