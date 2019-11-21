import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { UploadModule } from '../upload/upload.module';

@NgModule({
  imports: [
    CommonModule,
    UploadModule
  ],
  declarations: [UserMenuComponent],
  entryComponents: [UserMenuComponent],
  exports: [UserMenuComponent]
})
export class UserMenuModule { }
