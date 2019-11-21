import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import * as SocketIo from 'socket.io-client';
import { PostStats } from '../../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})

export class UpdateContentStatsService {
  private socket: any;
  private readonly uri = 'http://localhost:4000/real-time-post-stats';
  private socketAlreadyOn = false;
  public initSocket() {
    if (!this.socketAlreadyOn) {
      this.socket = SocketIo(this.uri);
      this.socketAlreadyOn = true;
    } else { return; }
  }
  public onContentLikesChange(): Observable<object> {
    return new Observable<PostStats>(observer => {
      this.socket.on('content likes change', (data: PostStats) => observer.next(data));
    });
  }
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event, () => observer.next());
    });
  }
  constructor() { }
}
