import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Comment, CommentReply } from '../../interfaces/comments.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private uri = 'http://localhost:4000';
  comment: Comment = {
    _id: '',
    discussion_id: '',
    author_id: '',
    author_name: '',
    author_profilePic: '',
    text: '',
    createdAt: Object
  };

  constructor(private http: HttpClient) { }

  submitComment(comment: Comment) {
    return this.http.post(`${this.uri}/comment/post`, comment);
  }
  fetchComments(discussion_id: string, user_id: string) {
    const options = discussion_id ? { params: new HttpParams().set('discussion_id', discussion_id).set('user_id', user_id) } : {};
    return this.http.get(`${this.uri}/comment/get`, options);
  }
  likeComment(comment_id: string, reactorId: string) {
    return this.http.post(`${this.uri}/comment/like`, {comment_id: comment_id, reactorId: reactorId});
  }
  dislikeComment(comment_id: string, reactorId: string) {
    return this.http.post(`${this.uri}/comment/dislike`, {comment_id: comment_id, reactorId: reactorId});
  }
  submitReply(reply: CommentReply) {
    return this.http.post(`${this.uri}/comment/reply`, reply);
  }
  fetchReplies(parent_id: string) {
    return this.http.get(`${this.uri}/commentreplies/get/${parent_id}`);
  }
}
