import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { RenderReplyThreadComponent } from './render-reply-thread.component';
import { CommentReplyInputBoxModule } from '../comment-reply-input-box/comment-reply-input-box.module';
import { FetchCommentRepliesComponent } from '../fetch-comment-replies/fetch-comment-replies.component';

@NgModule({
imports: [MatCardModule, CommonModule, CommentReplyInputBoxModule],
exports: [RenderReplyThreadComponent],
declarations: [RenderReplyThreadComponent, FetchCommentRepliesComponent]
})

export class RenderReplyThreadModule { }