import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { CommentReplyInputBoxComponent } from './comment-reply-input-box.component';

@NgModule({
imports : [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
],
exports: [CommentReplyInputBoxComponent],
declarations: [CommentReplyInputBoxComponent]
})

export class CommentReplyInputBoxModule { }
