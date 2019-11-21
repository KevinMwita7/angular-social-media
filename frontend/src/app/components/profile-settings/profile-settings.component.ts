import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ProfilePicturePickerComponent } from '../../components/profile-picture-picker/profile-picture-picker.component';

import { SettingsService } from '../../services/settings/settings.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { Profile, Token } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
/**
 *ProfileSettingsComponent is responsible for allowing the user to change their username, email and bio
 */
export class ProfileSettingsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private settings: SettingsService,
    private AuthService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  @Input() owner_id$: string;
  @Output() username: EventEmitter<string> = new EventEmitter<string>();
  owner_id: string;
  profileForm: FormGroup;
  profileDetails: Profile = { };
  profileFormSubmitted: Boolean = false;

  ngOnInit() {
    // Hold a reference to the _id of the currently logged in user passed in as an input from the SettingsComponent
    this.owner_id = this.owner_id$;
    // Build the form group to alow the user to enter changes they want to make
    this.profileForm = this.formBuilder.group({
      username: [null],
      email: [null, Validators.email],
      bio: [null],
  });
  }

  // Return the fields of the profileForm FormGroup to use it for validation of user input.
  // Also used to get the values entered in the form during form submission
  get profileFormFields() {
    return this.profileForm.controls;
  }

  submitProfileForm(): void {
    // Indication that the profle form has been submitted
    this.profileFormSubmitted = true;
    // Store the values entered in the form in a profileDetails object
    if (this.profileForm.valid) {
      this.profileDetails.username = this.profileFormFields['username'].value;
      this.profileDetails.email = this.profileFormFields['email'].value;
      this.profileDetails.bio = this.profileFormFields['bio'].value;
      // Ensure that at least one field was filled before submitting the form
      if (this.profileDetails.username || this.profileDetails.email || this.profileDetails.bio) {
      this.settings.changeProfileDetails(this.profileDetails, this.owner_id).subscribe((response: Token) => {
        // In case of no error, update the user token with up-to-date user information
        // Also emit the up-to-date username to the SettingsComponent
        if (response['Failure'] === undefined) {
          this.AuthService.newToken(response.token);
          this.username.emit(this.AuthService.getUserDetails().username);
        }
        // In case of any error, notify user appropriately
        if (response['Failure'] && response['Failure'] === 'Username already taken') {
          console.log('Choose a unique username');
        }
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('Done updating profile details');
      });
    }}
  }
  // Allow the use to upload a profile picture
  chooseProfilePicture() {
    this.dialog.closeAll();
    this.dialog.open(ProfilePicturePickerComponent, { width: '80%', height: '50%' });
  }
}
