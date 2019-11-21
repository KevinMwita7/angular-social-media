import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
// tslint:disable-next-line: max-line-length
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { ProfilePictureModule } from '../../../modules/profile-picture/profile-picture.module';
import { SettingsComponent } from '../settings.component';
import { SettingsService } from '../../../services/settings/settings.service';
import { TokenInterceptor } from '../../../interceptors/auth.interceptor';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UploadModule } from 'src/app/modules/upload/upload.module';
import { AccountSecuritySettingsComponent } from '../../account-security-settings/account-security-settings.component';
import { AddressContactsSettingsComponent } from '../../address-contacts-settings/address-contacts-settings.component';
import { ProfileSettingsComponent } from '../../profile-settings/profile-settings.component';
import { PreferencesSettingsComponent } from '../../preferences-settings/preferences-settings.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ProfilePictureModule,
    UploadModule,
    MatTooltipModule
  ],
  declarations: [
    SettingsComponent,
    AccountSecuritySettingsComponent,
    AddressContactsSettingsComponent,
    ProfileSettingsComponent,
    PreferencesSettingsComponent
  ],
  entryComponents: [SettingsComponent],
  providers: [SettingsService, ProfileService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
