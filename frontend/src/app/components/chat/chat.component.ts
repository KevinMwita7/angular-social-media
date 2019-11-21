import { Component, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UsersService } from '../../services/user-service/user-service.service';
import { ChatThreadsService } from '../../services/chat-thread/chat-thread.service';
import { ChatMessagesService } from '../../services/chat-message/chat-message.service';
import { ProfileService } from '../../services/profile/profile.service';
import { ChatService } from '../../services/chat-service/chat.service';
import { AccountContainerService } from '../../services/account-container/account-container.service';
import { ChatViewManagerService } from '../../services/chat-view-manager/chat-view-manager.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenInterceptor } from '../../interceptors/auth.interceptor';

import { User } from '../../models/user.model';
import { UserAccount } from '../../models/user-account.model';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatSocketService } from 'src/app/services/chat-socket/chat-socket.service';

/**
 * The ChatComponent imports the services related to Chat to ensure that they are detroyed whenever
 * the component itself is destroyed. This is to safeguard against stale data such as when a user logs out but
 * does not exit the app. If the service was provided at module level, the messages of the previously logged
 * in user will still be there in the ChatMessageService even when a new user logs in. Find a better way as
 * this might be wasteful since data needs to be fetched each and every time a component is restarted
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ ChatService,
    ChatThreadsService,
    ChatSocketService,
    ChatMessagesService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class ChatComponent implements OnInit {
  me: User;
  chatRoomVisible = true;
  conversationsVisible = false;
  searchResultsVisible = false;
  accountsFound: UserAccount[];
  currentUser: UserAccount;
  friends: UserAccount[];

  constructor(
    public usersService: UsersService,
    public chatThreadService: ChatThreadsService,
    public chatMessagesService: ChatMessagesService,
    public profileService: ProfileService,
    public chatService: ChatService,
    public accountContainer: AccountContainerService,
    public chatView: ChatViewManagerService,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
      this.init();
      this.trackChatView();
      this.getFriendsList();
  }
init(): void {
// construct the User model for the currently logged in user
this.accountContainer.getAccount().subscribe((account: UserAccount) => {
  this.me = new User(account.owner_id, account['owner'], account.profilePic, account._id);
});
// make a subscription to an observer to get up to date search results
this.chatService.getSearchResults().subscribe((accounts: UserAccount[]) => {
  this.accountsFound = accounts;
});
// TODO make `messages` hot
this.chatMessagesService.messages.subscribe(() => ({}));
// set the current user
this.usersService.setCurrentUser(this.me);
}
// used to update the view depending on whether a thread has been clicked
// or the back button in a thread has been clicked
hideChatRoom(value: boolean) {
  this.chatRoomVisible = !this.chatRoomVisible;
}
// get all messages a user has ever pariticpated in
getAllMessages(user_id: string) {
  this.chatService.getAllMessages(user_id).subscribe((messages: Array<ChatMessage>) => {
    messages.map((message: ChatMessage) => {
      this.chatMessagesService.addMessage(message);
    });
  });
}
// subscribes to observers in the ChatViewService to know when the user wants
// to view another component in the chat sidenav and hides the rest of the other views
trackChatView() {
  this.chatView.conversationsViewObservable().subscribe((state: boolean) => {
    this.conversationsVisible = state;
  });
  this.chatView.searchResultsViewObservable().subscribe((state: boolean) => {
    this.searchResultsVisible = state;
  });
  this.chatView.chatRoomViewObservable().subscribe((state: boolean) => {
    this.chatRoomVisible = state;
  });
}
// collect the people who the user follows and they follow back. To be displayed in the friends tab
getFriendsList(): void {
  const user_id = this.authService.getUserDetails()._id;
  this.chatService.getFriendsList(user_id).subscribe((friends: UserAccount[]) => {
    this.friends = friends;
  });
  return;
}
}
