import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetails } from '../../interfaces/user-details';
import { TokenResponse } from '../../interfaces/user-details';
import { TokenPayload } from '../../interfaces/user-details';
import { AccountContainerService } from '../../services/account-container/account-container.service';

const helper = new JwtHelperService();

@Injectable()
export class AuthenticationService {
  private token: string;
  uri = 'http://localhost:4000';
  constructor(
    private http: HttpClient,
    private router: Router,
    private accountContainer: AccountContainerService
    ) {}

  private saveToken(token: string): void {
    localStorage.setItem('artsy-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('artsy-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('artsy-token');
    window.localStorage.removeItem('artsy-account');
    this.accountContainer.clear();
    this.router.navigateByUrl('/home');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    // Check whether the token is expired and return true or false
    return !helper.isTokenExpired(this.getToken());
    /*const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }*/
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let request;
    if (method === 'post') {
      request = this.http.post(`${this.uri}/${type}`, user).pipe(map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      }));
    } else {
      request = this.http.get(`${this.uri}/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }})
      .pipe(map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      }));
    }
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  get fetchToken() {
    return this.getToken();
  }
  public newToken(token: string) {
    this.token = token;
    localStorage.removeItem('artsy-token');
    localStorage.setItem('artsy-token', token);
  }
}
