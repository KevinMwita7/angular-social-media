import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../interceptors/auth.interceptor';
import { ProfilePicturePickerComponent } from '../../components/profile-picture-picker/profile-picture-picker.component';
import { ProfilePictureService } from '../../services/profile-picture/profile-picture.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  declarations: [ProfilePicturePickerComponent],
  entryComponents: [ProfilePicturePickerComponent],
  exports: [ProfilePicturePickerComponent],
  providers: [ProfilePictureService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class ProfilePictureModule { }
