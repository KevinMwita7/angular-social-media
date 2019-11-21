import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { AccountRoutingModule } from './account-routing.module';
import { UserNavbarModule } from '../../user-navbar/user-navbar.module';
import { ChatModule } from '../../chat/chat.module';

import { ProfileService } from '../../../services/profile/profile.service';
import { PostTextsService } from 'src/app/services/post-texts/post-texts.service';

import { AccountComponent } from '../account.component';

import { TokenInterceptor } from '../../../interceptors/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgProgressModule,
    UserNavbarModule,
    ContentLoaderModule,
    ChatModule,
    MatSidenavModule
  ],
  declarations: [AccountComponent],
    providers: [ProfileService, PostTextsService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
