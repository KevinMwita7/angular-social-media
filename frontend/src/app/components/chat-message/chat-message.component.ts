import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { AccountContainerService } from '../../services/account-container/account-container.service';

import { UserAccount } from 'src/app/models/user-account.model';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  currentUser: UserAccount;
  incoming: boolean;

  constructor(
    public accountContainer: AccountContainerService
  ) { }

  ngOnInit(): void {
    this.accountContainer.getAccount()
    .subscribe((user: UserAccount) => {
      this.currentUser = user;
      if (this.currentUser && this.chatMessage.sender_id) {
        this.incoming = this.chatMessage.sender_id !== user._id;
      }
    });
  }
  formatTime(date: string) {
    return (moment(date, 'HH:mm').format('HH:mm').toString().toLocaleUpperCase());
  }
}
