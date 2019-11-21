import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from '../profile.component';
import { TokenInterceptor } from '../../../interceptors/auth.interceptor';
import { ProfileService } from '../../../services/profile/profile.service';
import { UserNavbarModule } from '../../user-navbar/user-navbar.module';
import { UserProfileCardModule } from '../../user-profile-card/user-profile-card.module';
import { RenderUploadedImagesModule } from '../../render-uploaded-images/render-uploaded-images.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    MatCardModule,
    NgProgressModule,
    MatButtonModule,
    LayoutModule,
    UserNavbarModule,
    UserProfileCardModule,
    RenderUploadedImagesModule
  ],
  declarations: [ProfileComponent],
  providers: [ProfileService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class ProfileModule { }
