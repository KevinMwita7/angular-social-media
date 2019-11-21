import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ChatThreadsService } from '../../services/chat-thread/chat-thread.service';
import { ChatService } from '../../services/chat-service/chat.service';
import { ChatMessagesService } from '../../services/chat-message/chat-message.service';
import { AccountContainerService } from '../../services/account-container/account-container.service';

import { UserAccount } from '../../models/user-account.model';
import { ChatThread } from '../../models/chat-thread.model';
import { ChatMessage } from 'src/app/models/chat-message.model';

@Component({
  selector: 'app-chat-search-result',
  templateUrl: './chat-search-result.component.html',
  styleUrls: ['./chat-search-result.component.css']
})
export class ChatSearchResultComponent implements OnInit {

  @Input() result: UserAccount;
  @Output() chatRoomVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentUser: UserAccount;
  showUser: boolean ;

  constructor(
    private chatThreadService: ChatThreadsService,
    private chatService: ChatService,
    private messagesService: ChatMessagesService,
    private accountContainer: AccountContainerService) { }

  ngOnInit() {
    this.accountContainer.getAccount().subscribe((account: UserAccount) => {
      this.currentUser = account;
    });
    if ( this.result && this.currentUser && (this.result.owner_id !== this.currentUser.owner_id)) {
      this.showUser = true;
    } else {
      this.showUser = false;
    }
  }

  setThread($event) {
    $event.preventDefault();
    // navigate to the chat room
    this.chatRoomVisible.emit(true);
    // set the current thread as the one selected
    // fetch the messages in the currently selected thread from the backend
    /*this.chatService.getThreadMessages([this.currentUser._id, this.result._id]).subscribe((response: object) => {
      const currentThread = new ChatThread(response['conversation_id'], this.result['owner'], this.result['profilePic']);
      this.chatThreadService.setCurrentThread(currentThread);
      response['messages'].map((message: ChatMessage) => {
        // add the messages for a thread to a list containing messages
        // pass the results into the necessary component for rendering
        message.thread = currentThread;
        this.messagesService.addMessage(message);
      });
    });*/
  }
}
