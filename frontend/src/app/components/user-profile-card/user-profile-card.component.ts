import { Component, OnInit, Input } from '@angular/core';
import { UserAccount } from '../../models/user-account.model';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.css']
})
/**
 * Renders the card that shows the user's username, profile picture and location
 * if the former has been permitted.
 */
export class UserProfileCardComponent implements OnInit {
  @Input() userAccount: UserAccount;
  @Input() location: Location;
  act: UserAccount;
  loc: Location;
  constructor() { }

  ngOnInit() { }
}
