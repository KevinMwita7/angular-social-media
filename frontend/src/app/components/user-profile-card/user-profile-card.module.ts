import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { UserProfileCardComponent } from './user-profile-card.component';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
@NgModule({
imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ContentLoaderModule
],
exports: [UserProfileCardComponent],
declarations: [UserProfileCardComponent]
})

export class UserProfileCardModule { }
