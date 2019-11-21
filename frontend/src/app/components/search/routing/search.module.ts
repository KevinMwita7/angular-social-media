import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ChatModule } from '../../chat/chat.module';
import { MatSidenavModule } from '@angular/material';

import { TokenInterceptor } from '../../../interceptors/auth.interceptor';

import { SearchRoutingModule } from './search-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchComponent } from '../search.component';
import { RenderMediaModule } from '../../render-media/render-media-module';
import { UserNavbarModule } from '../../user-navbar/user-navbar.module';
import { FiltersModule } from '../../filters/filters.module';
import { FoundUsersModule } from '../../found-users/found-users.module';

import { SearchService } from 'src/app/services/search/search.service';
import { ReactionsService } from 'src/app/services/reactions/reactions.service';
import { ProfilePictureService } from 'src/app/services/profile-picture/profile-picture.service';
import { PostTextsService } from 'src/app/services/post-texts/post-texts.service';
import { FollowService } from 'src/app/services/follow/follow.service';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    LazyLoadImageModule,
    RenderMediaModule,
    UserNavbarModule,
    FiltersModule,
    FoundUsersModule,
    NgProgressModule,
    ChatModule,
    MatSidenavModule
  ],
  declarations: [SearchComponent],
  providers: [SearchService, ReactionsService, PostTextsService, ProfilePictureService, FollowService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchModule { }
