import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  private uri = 'http://localhost:4000';

  imageFeed(username) {
    return this.http.get(`${this.uri}/${username}/feed/images`);
  }
}
