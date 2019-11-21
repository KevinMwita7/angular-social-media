import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { DialogComponent } from '../../components/dialog/dialog.component';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProfileService } from '../../services/profile/profile.service';
import { AccountContainerService } from 'src/app/services/account-container/account-container.service';

import { UserAccount } from '../../models/user-account.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
/**
 * Responsible for rendering ProfileSetingsComponent, AccountSecuritySettingsComponent, AddressSettingsComponent
 * and PreferencesSettingsComponent
 */
export class SettingsComponent implements OnInit {
  constructor(
    public AuthService: AuthenticationService,
    private profile: ProfileService,
    public dialog: MatDialog,
    private router: Router,
) { }
  username: string = this.AuthService.getUserDetails().username;
  account: UserAccount;
  owner_id: string;

  ngOnInit() {
      this.owner_id = this.AuthService.getUserDetails()._id;
      this.profile.fetchAccount(this.owner_id).subscribe((account: UserAccount) => {
        this.account = account;
      });
  }
  // Opens the upload dialog to allow the user to upload pictures
  public openUploadDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(DialogComponent, { width: '90%', height: '50%' });
  }
  // When clicked, it navigates to the currently logged in user's profile
  viewProfile() {
    this.router.navigate([this.owner_id]);
  }

  // Updates probably outdated username with the up-to-date on provided by the ProfileSettingsComponent
  updateUsername(newUsername: string) {
    this.username = newUsername;
  }
}
