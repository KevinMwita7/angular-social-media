import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RenderSpecificMediaModule } from '../render-specific-post/render-specific-post.module';

import { RenderMediaComponent } from './render-media.component';

import { MediaStatsSharedService } from 'src/app/services/media-stats/media-stats-shared.service';

@NgModule({
    imports: [
        CommonModule,
        InfiniteScrollModule,
        RenderSpecificMediaModule
    ],
    exports: [RenderMediaComponent],
    declarations: [RenderMediaComponent],
    providers: [MediaStatsSharedService]
})

export class RenderMediaModule { }
