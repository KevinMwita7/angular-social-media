import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Comment, CommentReactionDetails } from '../../interfaces/comments.interface';
import { Event } from '../../enums/client-socket.enums';

const uri = 'http://localhost:4000/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentSocketService {
  private socket: any;
  public initSocket() {
    this.socket = SocketIO(uri);
  }
  public submitComment(comment: Comment) {
    this.socket.emit('image comment', comment);
  }
  public onComment(): Observable<Comment> {
    return new Observable<Comment>(observer => {
      this.socket.on('image comment', (data: Comment) => observer.next(data));
    });
  }
  public onNewCommentsCount(): Observable<object> {
    return new Observable<object>(observer => {
      this.socket.on('comments count change', (data: object) => observer.next(data));
    });
  }
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event, () => observer.next());
    });
  }
  constructor() { }
}
