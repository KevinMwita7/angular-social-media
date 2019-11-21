import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FollowService } from 'src/app/services/follow/follow.service';

import { FoundUsersComponent } from './found-users.component';

import { TokenInterceptor } from 'src/app/interceptors/auth.interceptor';

@NgModule({
    imports: [MatButtonModule, RouterModule, CommonModule],
    exports: [FoundUsersComponent],
    declarations: [FoundUsersComponent],
    providers: [
        FollowService, {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})

export class FoundUsersModule { }
