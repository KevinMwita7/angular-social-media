import { Component, OnInit, Input } from '@angular/core';

import { UserAccount } from '../../models/user-account.model';
import { Conversation } from '../../models/conversation.model';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatThread } from '../../models/chat-thread.model';

import { AccountContainerService } from '../../services/account-container/account-container.service';
import { ChatService } from '../../services/chat-service/chat.service';
import { ChatMessagesService } from '../../services/chat-message/chat-message.service';
import { ChatThreadsService } from '../../services/chat-thread/chat-thread.service';
import { ChatViewManagerService } from '../../services/chat-view-manager/chat-view-manager.service';

@Component({
  selector: 'app-chat-friends-list',
  templateUrl: './chat-friends-list.component.html',
  styleUrls: ['./chat-friends-list.component.css']
})
export class ChatFriendsListComponent implements OnInit {
  @Input() chatFriend: UserAccount;
  currentUser: UserAccount;
  clicked = false;
  fetchedThreads: Array<string>;

  constructor(public accountContainer: AccountContainerService,
    public chatService: ChatService,
    public chatMessages: ChatMessagesService,
    public chatThreads: ChatThreadsService,
    public chatViewManager: ChatViewManagerService) { }

  ngOnInit() {
    this.accountContainer.getAccount().subscribe((currentUser: UserAccount) => {
      this.currentUser = currentUser;
    });
  }
  setThread(event) {
    event.preventDefault();
    // switch to the chat roomview
    this.chatViewManager.showChatRoom();
    this.fetchedThreads = this.chatThreads.fetchedThreads;
    if (!this.fetchedThreads.includes(this.chatFriend._id)) {
      this.chatThreads.fetchedThreads.push(this.chatFriend._id);
      // fetch the messages of the particular thread
      this.chatService.getThreadMessages([this.currentUser._id, this.chatFriend._id]).subscribe((conversation: Conversation) => {
        // set the current thread
        const currentThread = new ChatThread(conversation.conversation_id, this.chatFriend['owner'], this.chatFriend.profilePic);
        this.chatThreads.setCurrentThread(currentThread);
        // add messages to the pool of messages
        conversation.messages.forEach((message: ChatMessage) => {
          this.chatMessages.addMessage(message);
        });
      });
    }
  }
}
