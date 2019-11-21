import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProfileService } from '../../services/profile/profile.service';
import { ProfilePicContainerService } from '../../services/profile-pic-container/profile-pic-container.service';
import { CommentSocketService } from '../../services/comment-socket/comment-socket.service';
import { AccountContainerService } from '../../services/account-container/account-container.service';
import { ChatService } from 'src/app/services/chat-service/chat.service';

import { UserAccount } from '../../models/user-account.model';
import { ChatMessage } from '../../models/chat-message.model';

import { Event } from '../../enums/client-socket.enums';
import { ChatMessagesService } from 'src/app/services/chat-message/chat-message.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
/**
 *AccountComponent is responsible for rendering a user's feed. Also fetches the account details and
 *stores them in a AccountContainerService which is a shared service, thus making the said account
 *details available and up-to-date throughout our whole app
 */
export class AccountComponent implements OnInit {
  username: string;
  searchterm = '';
  currentUserId: string;
  progressRef: NgProgressRef;
  account: UserAccount;

  constructor(private router: Router,
    private progress: NgProgress,
    private AuthService: AuthenticationService,
    private profile: ProfileService,
    public profilePicContainer: ProfilePicContainerService,
    private commentSocket: CommentSocketService,
    public accountContainer: AccountContainerService,
    public chatService: ChatService,
    public chatMessagesService: ChatMessagesService
    ) { }

  ngOnInit() {
      this.AuthService.profile().subscribe(user => {
      this.username = user.username;
      this.currentUserId = user._id;
      this.fetchAccount(this.currentUserId);
        // this.initIoSocket();
      }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      // Initiate the progress bar showing the progress of the page being loaded
    this.progressRef = this.progress.ref();
  }

  private fetchAccount(secondary_key: string) {
    // const secondary_key = this.AuthService.getUserDetails()._id;
    this.profile.fetchAccount(secondary_key).subscribe((account: UserAccount) => {
      this.profilePicContainer.setProfilePicture(account.profilePic);
      // store the current account in a shared service to make sure it is available thoroughout our app
      this.accountContainer.setAccount(account);
      // subscribe to the AccountContainer shared service to make sure we have up-to-date AccountDetails
      // if any changes are made, say user changes any details in settings, the AccountContainer is notified
      // of these changes
      this.accountContainer.getAccount().subscribe((_account: UserAccount) => {
        this.account = _account;
      });
    }, err => console.error(err),
    () => console.log('Done fetching account'));
  }

  public search() {
    if (!this.searchterm) {
      return;
    }
    this.router.navigate(['search'], {queryParams: {query: this.searchterm}, queryParamsHandling: 'merge'});
  }

  private initIoSocket() {
    this.commentSocket.initSocket();
    this.commentSocket.onEvent(Event.CONNECT).subscribe(() => {
      console.log('Connected');
    });
  }
}
