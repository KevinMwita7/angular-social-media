import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenPayload } from '../../interfaces/user-details';

@Component({
  selector: 'app-browse-page-dialog',
  templateUrl: './browse-page-dialog.component.html',
  styleUrls: ['./browse-page-dialog.component.css']
})
/**
 * A pop up component to allow the user to log in while in the browse page
 */
export class BrowsePageDialogComponent implements OnInit {

  @ViewChild('accessOptions') accessOptions;
  signInForm: FormGroup;
  submitted = false;
  waitingForResponse = false;
  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  constructor(public dialog: MatDialogRef<BrowsePageDialogComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthenticationService) { }

  ngOnInit() {
    // Build the signInForm FormGroup
    this.signInForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  popup() {
    this.accessOptions.nativeElement.click();
  }
  // Returns the fields of the signInForm. Used to ensure validity of data entered and to get data entered for submission
  get formControls() {
    return this.signInForm.controls;
  }
  // Closes the sign up pop-up and navigates to the sign up page if the user has no account and wishes to create one
  navigateToSignUpPage() {
    this.dialog.close();
    this.router.navigate(['/signup']);
  }

  signIn() {
    // Sets the variable submitted to true which then allows the user to be informed of any mistake made during data entry
    this.submitted = true;
    // Checks the validity of the form entered
    if (this.signInForm.valid) {
      // Sets the variable waitingForResponse to true which disables the submit button while waiting for a response from the backend
      this.waitingForResponse = true;
      // Stores the data entered in the form in an object for submission
      this.credentials.username = this.formControls.username.value;
      this.credentials.password = this.formControls.password.value;
      // Submit data entered to the backend for authentication, close any pop-up and then navigate to the user's feed if he/she is authentic
     this.AuthService.login(this.credentials).subscribe(() => {
       this.dialog.close();
       this.router.navigateByUrl('');
     }, (err) => {
       console.log(err);
       // Sets the variable waitingForResponse to false which enables the submit button to allow the user to resubmit the appropriate data
       this.waitingForResponse = false;
      });
    }
  }
}
