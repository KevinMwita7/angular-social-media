import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import 'rxjs/add/operator/filter';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProfileService } from '../../services/profile/profile.service';

import { UserAccount } from '../../models/user-account.model';

import { Posts } from '../../interfaces/posts.interface';
import { Location } from '../../interfaces/address.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
/**
 *Fetches a user's account and uploads. Done when one user is viewing either their own account or another
 *user's account
*/
export class ProfileComponent implements OnInit {
  constructor(private authentication: AuthenticationService,
    private router: Router,
    private profile: ProfileService,
    private progress: NgProgress,
    private activeRoute: ActivatedRoute) { }
  username: string;
  currentUserId: string;
  account: UserAccount = new UserAccount();
  uploadedPosts: Array<Posts> = [];
  peopleFollowed: Array<string> = [];
  followers: Array<string> = [];
  progressRef: NgProgressRef;
  searchterm: string;
  location: Location = {
    city: '',
    country: ''
  };

  ngOnInit() {
    this.username = this.authentication.getUserDetails().username;
    this.currentUserId = this.authentication.getUserDetails()._id;
    this.progressRef = this.progress.ref();
    this.fetchAccount();
    this.fetchLocation();
    this.fetchImageUploads();
  }

  // Fetches the account of the requested user. Uses the user's _id as the secondary_key
  fetchAccount() {
    this.activeRoute.paramMap.subscribe(params => {
      const secondary_key = params['params'].username;
      this.progressRef.start();
      this.profile.fetchAccount(secondary_key).subscribe((account: UserAccount) => {
        this.account = account;
        this.progressRef.complete();
      });
    });
  }

  // Fetches the location the requested user set as their present one. Uses their _id as the secondary_key
  // find a way to give the user an option to display or not display their city
  fetchLocation() {
    this.activeRoute.paramMap.subscribe(params => {
      const secondary_key = params['params'].username;
      this.profile.fetchLocation(secondary_key).subscribe((location: Location) => {
        this.location = location;
      }, err => console.error(err));
    });
  }

  search() {
    if (!this.searchterm) {
      return;
    }
    this.router.navigate(['search'], {queryParams: {query: this.searchterm}, queryParamsHandling: 'merge'});
  }

  // Fetches the images that the requested user uploade. Uses their _id as the secondary key
  fetchImageUploads() {
    this.activeRoute.paramMap.subscribe(params => {
      const secondary_key = params['params'].username;
      this.profile.fetchImageUploads(secondary_key).subscribe((imageUploads: Array<Posts>) => {
        this.uploadedPosts = imageUploads;
      });
    });
  }
}
