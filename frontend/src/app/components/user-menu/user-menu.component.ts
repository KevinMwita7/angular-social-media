import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  @ViewChild('userActions') userActions;
  canBeClosed = true;
  constructor(public dialog: MatDialogRef<UserMenuComponent>,
    private router: Router,
    private AuthService: AuthenticationService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.routing();
  }

  popup() {
    this.userActions.nativeElement.click();
  }

  routing() {
    document.getElementById('settings').
    addEventListener('click', () => {
      this.dialog.close();
      this.router.navigateByUrl(`/${this.AuthService.getUserDetails().username}/settings`);
    });
  }

  logOut() {
    this.dialog.close();
    this.AuthService.logout();
  }

  openUploadDialog() {
    this.dialog.close();
    this._dialog.open(DialogComponent, {width: '50%', height: '50%'});
  }
}
