import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenPayload } from 'src/app/interfaces/user-details';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  form1: FormGroup;
  submitted = false;
  waitingForResponse = false;
  signUpCredentials: TokenPayload = {
    email: '',
    username: '',
    password: ''
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private AuthService: AuthenticationService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
    });
    this.form.setValidators(this.passwordsDiffer());
  }

// get form fields
get fields() {
  return this.form.controls;
}
get signUpForm() {
  return this.form;
}

public passwordsDiffer (): ValidatorFn {
 return (G: FormGroup): ValidationErrors => {
   const pwd = G.controls['password'];
   const confirmation = G.controls['confirmPassword'];
   pwd.value !== confirmation.value ? confirmation.setErrors({differentPasswords: true}) : confirmation.setErrors(null);
   return;
 };
}

signUp() {
  this.submitted = true;
  if (this.form.valid) {
    this.waitingForResponse = true;
    this.signUpCredentials.email = this.fields.email.value;
    this.signUpCredentials.password = this.fields.password.value;
    this.signUpCredentials.username = this.fields.username.value;
    this.AuthService.register(this.signUpCredentials).subscribe(() => {
      this.router.navigateByUrl('');
    }, (err) => {
      console.log(err);
      this.waitingForResponse = false;
    });
    } else {
    return;
  }
}
}
