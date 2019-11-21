import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { ChatThread } from '../../models/chat-thread.model';
import { ChatMessage } from '../../models/chat-message.model';

const initialMessages: ChatMessage[] = [];

interface IMessagesOperation extends Function {
  (messages: ChatMessage[]): ChatMessage[];
}

@Injectable({
  providedIn: 'root'
})
/**
 * Responsible for sending a message to the backend for storage, adds a message to the observable stream
 * marks a thread as read by marking all its messages as read and adds a message to a list of messages
 */
export class ChatMessagesService implements OnDestroy {
  // a stream that publishes new messages only once
  newMessages: Subject<ChatMessage> = new Subject<ChatMessage>();

  // `messages` is a stream that emits an array of the most up to date messages
  messages: Observable<ChatMessage[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<ChatMessage> = new Subject<ChatMessage>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  ngOnDestroy() {
    console.log('ChatMessagesService Destroyed');
  }
  constructor(private http: HttpClient) {
    this.messages = this.updates
      // watch the updates and accumulate operations on the messages
      .scan((messages: ChatMessage[],
             operation: IMessagesOperation) => {
               return operation(messages);
             },
            initialMessages)
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      .publishReplay(1)
      .refCount();

    // `create` takes a ChatMessage and then puts an operation (the inner function)
    // on the `updates` stream to add the ChatMessage to the list of messages.
    //
    // That is, for each item that gets added to `create` (by using `next`)
    // this stream emits a concat operation function.
    //
    // Next we subscribe `this.updates` to listen to this stream, which means
    // that it will receive each operation that is created
    //
    // Note that it would be perfectly acceptable to simply modify the
    // "addMessage" function below to simply add the inner operation function to
    // the update stream directly and get rid of this extra action stream
    // entirely. The pros are that it is potentially clearer. The cons are that
    // the stream is no longer composable.
    this.create
      .map( function(message: ChatMessage): IMessagesOperation {
        return (messages: ChatMessage[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

    // similarly, `markThreadAsRead` takes a ChatThread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead
      .map( (thread: ChatThread) => {
        return (messages: ChatMessage[]) => {
          return messages.map( (message: ChatMessage) => {
            // note that we're manipulating `message` directly here. Mutability
            // can be confusing and there are lots of reasons why you might want
            // to, say, copy the ChatMessage object or some other 'immutable' here
            if (message.conversation_id === thread._id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);

  }

  // an imperative function call to this action stream
  addMessage(message: ChatMessage) {
    this.newMessages.next(message);
  }

  persistMessageToDatabase(message: ChatMessage): Observable<object> {
    return this.http.post(`http://localhost:4000/privatemessages/add`, message);
  }

  messagesForThreadUser(thread: ChatThread, user: User): Observable<ChatMessage> {
    return this.newMessages
      .filter((message: ChatMessage) => {
               // belongs to this thread
        return (message.conversation_id === thread._id) &&
               // and isn't authored by this user
               (message.sender_id !== user._id);
      });
  }
}

export const messagesServiceInjectables: Array<any> = [
  ChatMessagesService
];
