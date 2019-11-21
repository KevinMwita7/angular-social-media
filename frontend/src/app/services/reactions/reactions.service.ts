import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReactionsService {

  constructor(private http: HttpClient) { }
  private uri = 'http://localhost:4000';
  likePost(image_id: string, liker_id: string, type: string) {
    if (type === 'image') {
      return this.http.post(`${this.uri}/image/like`, {_id: image_id, liker: liker_id});
    } else if (type === 'text')  {
      return this.http.post(`${this.uri}/textPost/like`, {_id: image_id, liker: liker_id});
    }
  }
  unlikePost(image_id: string, liker_id: string, type: string) {
    if (type === 'image') {
      return this.http.post(`${this.uri}/image/unlike`, {_id: image_id, liker: liker_id});
    } else if (type === 'text') {
      return this.http.post(`${this.uri}/textPost/unlike`, {_id: image_id, liker: liker_id});
    }
  }
}
