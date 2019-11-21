import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { UserNavbarComponent } from './user-navbar.component';
import { UserMenuModule } from 'src/app/modules/user-menu/user-menu.module';
import { UploadModule } from 'src/app/modules/upload/upload.module';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        RouterModule,
        CommonModule,
        UserMenuModule,
        UploadModule,
        MatTooltipModule
    ],
    exports: [UserNavbarComponent],
    declarations: [UserNavbarComponent]
})

export class UserNavbarModule { }
