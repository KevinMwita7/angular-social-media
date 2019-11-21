import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule,
  MatDividerModule,
  MatButtonModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import { FromNowModule } from 'src/app/pipes/from-now/from-now.module';
import { UserNavbarModule } from 'src/app/components/user-navbar/user-navbar.module';

import { ProfileService } from 'src/app/services/profile/profile.service';
import { UsersService } from 'src/app/services/user-service/user-service.service';
import { SearchService } from 'src/app/services/search/search.service';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { ChatMessagesService } from 'src/app/services/chat-message/chat-message.service';
import { ChatThreadsService } from 'src/app/services/chat-thread/chat-thread.service';
import { ChatSocketService } from 'src/app/services/chat-socket/chat-socket.service';

import { ChatComponent } from 'src/app/components/chat/chat.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatThreadComponent } from '../chat-thread/chat-thread.component';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { ChatThreadsComponent } from '../chat-threads/chat-threads.component';
import { ChatSearchBarComponent } from '../chat-searchbar/chat-searchbar.component';
import { ChatSearchResultComponent } from '../chat-search-result/chat-search-result.component';
import { ChatFriendsListComponent } from '../chat-friends-list/chat-friends-list.component';
import { ChatGroupsComponent } from '../chat-groups/chat-groups.component';

import { TokenInterceptor } from '../../interceptors/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    UserNavbarModule,
    FromNowModule
  ],
  declarations: [
    ChatComponent,
    ChatMessageComponent,
    ChatThreadComponent,
    ChatThreadsComponent,
    ChatSearchBarComponent,
    ChatSearchResultComponent,
    ChatRoomComponent,
    ChatFriendsListComponent,
    ChatGroupsComponent
  ],
  providers: [
    ProfileService,
    UsersService,
    SearchService,
    // ChatService,
    // ChatMessagesService,
    // ChatThreadsService,ChatSocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ], exports: [ChatComponent]
})
export class ChatModule { }
