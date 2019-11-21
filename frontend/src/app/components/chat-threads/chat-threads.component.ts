import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatThreadsService } from '../../services/chat-thread/chat-thread.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  chatThreads: Observable<any>;
  empty: boolean;

  constructor(public chatThreadsService: ChatThreadsService,
  ) {
    this.chatThreads = chatThreadsService.orderedThreads;
  }

  ngOnInit() {
  }

}
