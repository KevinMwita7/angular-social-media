import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { FromNowModule } from 'src/app/pipes/from-now/from-now.module';

import { RenderHqImageModule } from 'src/app/modules/render-hq-image/render-hq-image.module';
import { RenderCommentsModule } from '../render-comments/render-comments.module';

import { CommentService } from 'src/app/services/comment/comment.service';

import { RenderSpecificMediaComponent } from './render-specific-post.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        LazyLoadImageModule,
        RenderHqImageModule,
        RenderCommentsModule,
        RouterModule,
        FromNowModule
    ],
    exports: [
        RenderSpecificMediaComponent
    ],
    declarations: [
        RenderSpecificMediaComponent
    ],
    providers: [
        CommentService
    ]
})

export class RenderSpecificMediaModule{ }