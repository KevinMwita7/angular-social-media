import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient, private authentication: AuthenticationService) { }
  private uri = 'http://localhost:4000';

  follow(details) {
    return this.http.post(`${this.uri}/following/add`, details);
  }

  unfollow(details) {
    return this.http.post(`${this.uri}/following/remove`, details);
  }

  getPeopleFollowed(loggedInUser) {
    return this.http.get(`${this.uri}/following/${loggedInUser}/getall`);
  }

  getFollowers(leader) {
    return this.http.get(`${this.uri}/followers/${leader}/getall`);
  }
}
