import { Component, OnInit, Input } from '@angular/core';
import { FollowService } from '../../services/follow/follow.service';
import { AccountCardModel } from '../../models/account-card.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-found-users',
  templateUrl: './found-users.component.html',
  styleUrls: ['./found-users.component.css']
})
export class FoundUsersComponent implements OnInit {
  @Input() foundAccounts: Array<AccountCardModel>;
  peopleFollowed: Array<string>;
  user_id: string = this.AuthService.getUserDetails()._id;
  constructor(private followService: FollowService,
    private AuthService: AuthenticationService) { }

  ngOnInit() {
  }
  follow(account: AccountCardModel) {
    const details = {user_id: account.owner_id, follower: this.user_id};
    if (account.alreadyFollowing()) {
      account.updateSubscription();
      this.followService.unfollow(details).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
    } else {
      account.updateSubscription();
      this.followService.follow(details).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
    }
  }
}
