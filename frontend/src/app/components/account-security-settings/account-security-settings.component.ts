import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings/settings.service';
import { Passwords } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-account-security-settings',
  templateUrl: './account-security-settings.component.html',
  styleUrls: ['./account-security-settings.component.css']
})
export class AccountSecuritySettingsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private settings: SettingsService
  ) { }
  @Input() owner_id$: string;
  owner_id: string;
  accountForm: FormGroup;
  accountFormSubmitted = false;
  passwords: Passwords = {
    oldPassword: '',
    newPassword: ''
  };

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      oldPassword: [null,  [Validators.required, Validators.minLength(6)]],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmation: [null]
    });
    this.accountForm.setValidators(this.comparisonValidator());
  }

  public comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const newPassword = group.controls['newPassword'];
      const confirmation = group.controls['confirmation'];
      newPassword.value !== confirmation.value ? confirmation.setErrors({notEquivalent: true}) : confirmation.setErrors(null);
      return;
    };
  }

  get accountFormFields() {
    return this.accountForm.controls;
  }

  submitAccountChanges(): void {
    this.accountFormSubmitted = true;
    if (this.accountForm.valid) {
      this.passwords.oldPassword = this.accountFormFields['oldPassword'].value;
      this.passwords.newPassword = this.accountFormFields['newPassword'].value;
      this.settings.changePassword(this.passwords, this.owner_id$).subscribe(response => {
          console.log(response);
    });
  }}
}
