import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DialogComponent } from '../dialog/dialog.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { SearchSocketService } from '../../services/search-socket/search-socket.service';
import { SearchService } from '../../services/search/search.service';
import { AccountContainerService } from '../../services/account-container/account-container.service';
import { Posts } from '../../interfaces/posts.interface';
import { UserAccount } from 'src/app/models/user-account.model';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  @Input() username: string;
  @Input() currentUserId: string;
  @Output() searchResult: Posts;
  profilePicSrc: string;

  constructor(public AuthService: AuthenticationService,
     private router: Router,
     private dialog: MatDialog,
     private searchService: SearchService,
     private searchSocketService: SearchSocketService,
     private accountContainer: AccountContainerService
     ) { }

  ngOnInit() {
    this.accountContainer.getAccount().subscribe((act: UserAccount) => {
      this.profilePicSrc = act.profilePic;
    });
  }

  settings() {
    this.router.navigate([this.username, 'settings']);
  }

  viewProfile() {
    this.router.navigate([this.currentUserId]);
  }

  public openUploadDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '60%' });
  }

  public openUserMenu() {
    this.dialog.closeAll();
    const userMenuDialog = this.dialog.open(UserMenuComponent, { width: '50%', height: '50%'});
  }

  search(searchterm) {
    if (!searchterm) {
      return;
    } else {
      this.router.navigate(['search'], {queryParams: {query: searchterm}, queryParamsHandling: 'merge'});
    }
  }

  logout() {
    this.AuthService.logout();
  }
}
