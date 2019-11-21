import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowseMediaComponent } from './browse-media.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        LazyLoadImageModule,
        InfiniteScrollModule,
    ],
    exports: [BrowseMediaComponent],
    declarations: [BrowseMediaComponent]
})

export class BrowseMediaModule {}
