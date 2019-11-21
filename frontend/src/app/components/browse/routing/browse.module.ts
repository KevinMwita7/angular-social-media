import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from '../browse.component';
import { BrowseMediaModule } from '../../browse-media/browse-media.module';
import { BrowsePageNavbarModule } from '../../browse-page-navbar/browse-page-navbar.module';
import { FiltersModule } from '../../filters/filters.module';


@NgModule({
  imports: [
    CommonModule,
    BrowseRoutingModule,
    LayoutModule,
    HttpClientModule,
    NgProgressModule,
    BrowseMediaModule,
    BrowsePageNavbarModule,
    FiltersModule
  ],
  declarations: [BrowseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BrowseModule { }
