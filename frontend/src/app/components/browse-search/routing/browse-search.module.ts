import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgProgressModule } from '@ngx-progressbar/core';
import { BrowseSearchRoutingModule } from './browse-search-routing.module';
import { BrowseSearchComponent } from '../browse-search.component';
import { BrowseModule } from '../../browse/routing/browse.module';
import { BrowseMediaModule } from '../../browse-media/browse-media.module';
import { BrowsePageNavbarModule } from '../../browse-page-navbar/browse-page-navbar.module';
import { FiltersModule } from '../../filters/filters.module';

@NgModule({
  imports: [
    CommonModule,
    BrowseSearchRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgProgressModule,
    BrowseModule,
    BrowseMediaModule,
    BrowsePageNavbarModule,
    FiltersModule
  ],
  declarations: [BrowseSearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrowseSearchModule { }
