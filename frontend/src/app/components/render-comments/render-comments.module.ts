import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderCommentsComponent } from './render-comments.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { RenderReplyThreadModule } from '../render-reply-thread/render-reply-thread.module';
import { CommentsInputBoxModule } from '../comments-input-box/comments-input-box.module';
import { FetchCommentsComponent } from '../fetch-comments/fetch-comments.component';
import { CommentActionsComponent } from '../comment-actions/comment-actions.component';
import { FromNowModule } from 'src/app/pipes/from-now/from-now.module';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        RenderReplyThreadModule,
        CommentsInputBoxModule,
        FromNowModule
    ],
    exports: [RenderCommentsComponent],
    declarations: [RenderCommentsComponent, FetchCommentsComponent, CommentActionsComponent]
})

export class RenderCommentsModule { }
