import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AccountContainerService } from '../../services/account-container/account-container.service';

import { TokenPayload } from '../../interfaces/user-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  signInForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthenticationService,
    private accountContainer: AccountContainerService
    ) { }
  submitted = false;
  waitingForResponse = false;
  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get fields() {
    return this.signInForm['controls'];
  }

  onSubmit() {
    this.submitted = true;
    if (this.signInForm.valid) {
      this.waitingForResponse = true;
      this.credentials.username = this.fields.username.value;
      this.credentials.password = this.fields.password.value;
      this.AuthService.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('');
      }, (err) => {
        console.log(err);
        this.waitingForResponse = false;
      });
    } else {
      console.log('Invalid form');
      return;
    }
  }
}
