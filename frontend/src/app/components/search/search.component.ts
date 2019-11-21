import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

import { SearchService } from '../../services/search/search.service';
import { FollowService } from '../../services/follow/follow.service';
import { ProfilePictureService } from '../../services/profile-picture/profile-picture.service';
import { ProfilePicContainerService } from '../../services/profile-pic-container/profile-pic-container.service';
import { SearchSocketService } from '../../services/search-socket/search-socket.service';
import { AccountContainerService } from '../../services/account-container/account-container.service';
import { ProfileService } from '../../services/profile/profile.service';
import { ChatMessagesService } from '../../services/chat-message/chat-message.service';

import { PostModel } from '../../models/image.model';
import { AccountCardModel } from '../../models/account-card.model';
import { UserAccount } from '../../models/user-account.model';
import { ChatMessage } from '../../models/chat-message.model';

import { Posts } from '../../interfaces/posts.interface';
import { Following } from '../../interfaces/follower.interface';
import { Unfollower } from '../../interfaces/unfollower.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
/**
 *Responsible for submitting search queries to the backend, receiving the results and
 *passing them to the relevant component for rendering
 */
export class SearchComponent implements OnInit {

  constructor(
    private authentication: AuthenticationService,
    private activeRoute: ActivatedRoute,
    private search: SearchService,
    private _follow: FollowService,
    private profilePicService: ProfilePictureService,
    private profilePicContainer: ProfilePicContainerService,
    private searchSocket: SearchSocketService,
    private progress: NgProgress,
    private accountContainer: AccountContainerService,
    private profile:ProfileService,
    private chatMessagesService: ChatMessagesService
  ) { }

  posts: Array<PostModel> = [];
  accounts: Array<AccountCardModel> = [];
  peopleFollowed: Array<string> = [];
  following: Following = {
    user_id: '',
    new_follower: ''
  };
  unfollower: Unfollower = {
    user_id: '',
    unfollower: ''
  };
  progressRef: NgProgressRef;
  noUsersFound: boolean;
  noPostsFound: boolean;
  _username = this.authentication.getUserDetails().username;
  user_id: string = this.authentication.getUserDetails()._id;
  account: UserAccount;

  ngOnInit() {
      this.progressRef = this.progress.ref();
      this.initIoConnections();
      this.getPeopleFollowed(this.user_id);
      this._search();
      this.updateProfilePic();
      this.fetchAccount(this.user_id);
  }

  // The function responsilbe for searching
  _search() {
    this.activeRoute.queryParams.subscribe(params => {
      // Start the progress-bar
      this.progressRef.start();
      // empty the results from the previous search
      this.clearView();
      // Ensure that the "No results found" text does not appear in the view
      this.noUsersFound = false;
      this.noPostsFound = false;
      // Submits the search query to the backend and waits for results. Expects only user accounts to be returned
      this.search.searchUsers(params['query']).subscribe((accounts: Array<UserAccount>) => {
        if (!this.progressRef.completed['closed']) {
          this.progressRef.complete();
        }
        if (accounts.length > 0) {
          accounts.forEach((account: UserAccount) => {
            this.accounts.push(new AccountCardModel(account, this.peopleFollowed));
          });
        } else {
          this.noUsersFound = true;
        }
      });
      // Submits the search query to the backend and waits for results. Expects only users' posts to be returned.
      /*A socket will be used to receive the data hence we are only waiting for the server to notify us it is done after
      *which we check to see any posts were returned. If none, we set the noPostsFound to true
      */
      this.search.searchPosts(params['query'], this.user_id).subscribe((response: object) => {
        if (!this.progressRef.completed['closed']) {
          this.progressRef.complete();
        }
        if (response['Success'] === 'Done searching through posts' && this.posts.length === 0) {
          this.noPostsFound = true;
        }
      });
    });
  }

  /* Gets the account _id of the people that the currently logged in user follows. Helps in determining whether to show the follow
  * or unfollow button.
  */
  getPeopleFollowed(user_id) {
    this._follow.getPeopleFollowed(user_id).subscribe(response => {
      this.peopleFollowed = response['following'];
    });
  }
  /*Fetches the most recent profile picture and updates the ProfilePicContainerService with its value
   *to make it available throughout the whole app. The main reason for this is that the user might change
   *the profile picture necessitating for a change thoughout the whole app.
   */
  updateProfilePic() {
    this.profilePicService.getProfilePicture().subscribe((profilePicUrl: object) => {
      if (profilePicUrl['profilePic']) {
        this.profilePicContainer.setProfilePicture(profilePicUrl['profilePic']);
      }
    });
  }

  // Initiates all socketIo connections
  private initIoConnections() {
    this.searchSocket.initSocket();
    // Whenever a post is returned as a search result, we push it into the Array of post models
    this.searchSocket.onPostSearchResult().subscribe((post: Posts) => {
      this.posts.push(new PostModel(post));
    });
  }

  // Empties the view
  private clearView() {
      this.posts.length = 0;
      this.accounts.length = 0;
  }

  // TODO: find a way to make sure that the account is only fetched if it does not exist
  private fetchAccount(secondary_key: string) {
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
}
