import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenPayload } from '../../interfaces/user-details';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  waitingForResponse = false;
  credentials: TokenPayload = {
    username: '',
    password: '',
  };

  constructor(private formBuilder: FormBuilder, private AuthService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

get fields() {
  return this.form.controls;
}

onSubmit() {
  this.submitted = true;
 if (this.form.valid) {
   this.waitingForResponse = true;
   this.credentials.username = this.fields.username.value;
   this.credentials.password = this.fields.password.value;
  this.AuthService.login(this.credentials).subscribe(() => {
    this.router.navigateByUrl('');
  }, (err) => {
    this.waitingForResponse = false;
  });
 } else {
   return;
  }
}
}
