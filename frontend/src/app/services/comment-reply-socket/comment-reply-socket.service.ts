import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';
import { Observable } from 'rxjs/observable';
import { CommentReply } from '../../interfaces/comments.interface';
import { Event } from '../../enums/client-socket.enums';

const uri = 'http://localhost:4000/comment-replies';

@Injectable({
  providedIn: 'root'
})
export class CommentReplySocketService {
  private socket: any;
  public initSocket() {
    this.socket = SocketIO(uri);
  }
  public submitReply(reply: CommentReply) {
    this.socket.emit('comment reply', reply);
  }
  public onReply(): Observable<CommentReply> {
    return new Observable<CommentReply>(observer => {
      this.socket.on('comment reply', (data: CommentReply) => observer.next(data));
    });
  }
  public onNewRepliesCount(): Observable<number> {
    return new Observable<number>(observer => {
      this.socket.on('replies count change', (data: number) => observer.next(data));
    });
  }
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
  constructor() { }
}
