import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';
import { ChatThread } from '../../models/chat-thread.model';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatMessagesService } from '../chat-message/chat-message.service';
import * as _ from 'lodash';

@Injectable()
export class ChatThreadsService {
  fetchedThreads: Array<string> = [];
  // `threads` is a observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: ChatThread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  orderedThreads: Observable<ChatThread[]>;

  // `currentThread` contains the currently selected thread
  currentThread: Subject<ChatThread> =
    new BehaviorSubject<ChatThread>(new ChatThread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<ChatMessage[]>;

  constructor(public messagesService: ChatMessagesService,
    public http: HttpClient) {

    this.threads = messagesService.messages
      .map( (messages: ChatMessage[]) => {
        const threads: {[key: string]: ChatThread} = {};
        // Store the message's thread in our accumulator `threads`
        messages.map((message: ChatMessage) => {
          threads[message.conversation_id] = threads[message.conversation_id] ||
            message.thread;
          // Cache the most recent message for each thread
          const messagesThread: ChatThread = threads[message.conversation_id];
          if (!messagesThread.lastMessage ||
              messagesThread.lastMessage.createdAt < message.createdAt) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      });

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: ChatThread }) => {
        const threads: ChatThread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: ChatThread) => t.lastMessage.createdAt).reverse();
      });

    this.currentThreadMessages = this.currentThread
      .combineLatest(messagesService.messages,
                     (currentThread: ChatThread, messages: ChatMessage[]) => {
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            .filter((message: ChatMessage) =>
                    (message.conversation_id === currentThread._id))
            .map((message: ChatMessage) => {
              message.isRead = true;
              return message; })
            .value();
        } else {
          return [];
        }
      });

    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: ChatThread): void {
    this.currentThread.next(newThread);
  }
}

export const threadsServiceInjectables: Array<any> = [
  ChatThreadsService
];
