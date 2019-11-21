import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Comment, CommentReactionDetails } from '../../interfaces/comments.interface';
import { Event } from '../../enums/client-socket.enums';


const uri = 'http://localhost:4000/comment-actions';

@Injectable({
  providedIn: 'root'
})
export class CommentActionsSocketService {
  private socket: any;
  public initSocket() {
    this.socket = SocketIO(uri);
  }
  public onCommentLiked(): Observable<CommentReactionDetails> {
    return new Observable<CommentReactionDetails>(observer => {
      this.socket.on('comment likes change', ((data: CommentReactionDetails) => observer.next(data)));
    });
  }
  public onCommentDisliked(): Observable<CommentReactionDetails> {
    return new Observable<CommentReactionDetails>(observer => {
      this.socket.on('comment dislikes change', ((data: CommentReactionDetails) => observer.next(data)));
    });
  }
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event, () => observer.next());
    });
  }
  constructor() { }
}
