import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import * as SocketIO from 'socket.io-client';
import { Event } from 'src/app/enums/client-socket.enums';
import { ChatMessage } from 'src/app/models/chat-message.model';

const uri = 'http://localhost:4000';

@Injectable({
  providedIn: 'root'
})
/**
 * Opens a socket and listens for messages emitted to it. This is used
 * while people are chatting
 */
export class ChatSocketService {
  private socket: any;
  initiatedSockets: Array<string> = [];
  public initSocket(conversation_id: string) {
      this.socket = SocketIO(uri);
      this.socket.emit('initiate chat conversation socket', conversation_id);
  }
  public sendMessage(msg: ChatMessage) {
    this.socket.emit('private message', msg);
  }
  public onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('incoming private message', (data: ChatMessage) => {
        observer.next(data);
      });
    });
  }
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
  constructor() { }
}
