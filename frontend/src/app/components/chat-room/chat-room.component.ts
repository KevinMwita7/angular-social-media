import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatThreadsService } from '../../services/chat-thread/chat-thread.service';
import { ChatMessagesService } from '../../services/chat-message/chat-message.service';
import { AccountContainerService } from '../../services/account-container/account-container.service';
import { ChatService } from '../../services/chat-service/chat.service';
import { ChatSocketService } from '../../services/chat-socket/chat-socket.service';
import { ChatViewManagerService } from '../../services/chat-view-manager/chat-view-manager.service';

import { ChatThread } from '../../models/chat-thread.model';
import { ChatMessage } from '../../models/chat-message.model';
import { UserAccount } from '../../models/user-account.model';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
/**
 * Sends, receives and renders images from a chat between people.
 */
export class ChatRoomComponent implements OnInit {
  // @Output() moveBack: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentThread: ChatThread;
  chatMessages: Observable<ChatMessage[]>;
  draftMessage: ChatMessage;
  currentUser: UserAccount;
  threadEmpty: boolean;

  constructor(
    public chatThreadService: ChatThreadsService,
    public chatMessagesService: ChatMessagesService,
    public accountContainerService: AccountContainerService,
    public el: ElementRef,
    public chatSocket: ChatSocketService,
    public chatView: ChatViewManagerService
    ) { }

  ngOnInit() {
    // this.initIOConnection();
    this.chatMessages = this.chatThreadService.currentThreadMessages;

    this.draftMessage = new ChatMessage();

    this.chatThreadService.currentThread.subscribe((thread: ChatThread) => {
      this.currentThread = thread;
      this.initIOConnection();
    });

    this.accountContainerService.getAccount().subscribe((user: UserAccount) => {
      this.currentUser = user;
    });
    // subscribing to the chatMessages observable as done below causes an error of cannot
    // read property _id of undefined
    this.chatMessages.subscribe((messages: Array<ChatMessage>) => {
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }
  // move back to either search results or threads view
  back() {
    // this.moveBack.emit(false);
    // TODO: make this move back to the appropriate view that led
    // to the chat room i.e. either conversations view or search results view
    this.chatView.showConversations();
  }

  sendMessage(event: any) {
    const m: ChatMessage = this.draftMessage;
    m.sender_id = this.currentUser._id;
    m.conversation_id = this.currentThread._id;
    m.thread = this.currentThread;
    m.isRead = true;
    this.chatMessagesService.addMessage(m);
    this.chatMessagesService.persistMessageToDatabase(m).subscribe();
    this.chatSocket.sendMessage(m);
    this.draftMessage = new ChatMessage();
    event.preventDefault();
  }

  cancel(event: any) {
    this.draftMessage = new ChatMessage();
    event.preventDefault();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.messages');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
  // if the socket for a particular conversation does not exist, initiate it.
  // TODO: find a way to avoid initiating a socket for every conversation a user clicks on.
  // instead, find a way to have sort of a universal socket listening for any messages being sent to
  // the user and storing them in ChatMessageService. To achieve this, find a unique attribute being shared by two
  // or more people chatting and use this attribute to broadcast to said users. Currently using message conversation_id for
  // broadcasting purposes
  initIOConnection() {
  if (!this.chatSocket.initiatedSockets.includes(this.currentThread._id)) {
    // initiate a socket for the current thread
    this.chatSocket.initSocket(this.currentThread._id);
    // listen for messages and add it to the messages stream
    this.chatSocket.onMessage().subscribe((msg: ChatMessage) => {
      this.chatMessagesService.addMessage(msg);
    });
    // add the current thread to the list of initiated sockets
    this.chatSocket.initiatedSockets.push(this.currentThread._id);
  }
  }
}
