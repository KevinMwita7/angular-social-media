import { Component, OnInit, Input } from '@angular/core';
import { ChatThreadsService } from '../../services/chat-thread/chat-thread.service';
import { ChatThread } from '../../models/chat-thread.model';
import { ChatViewManagerService } from '../../services/chat-view-manager/chat-view-manager.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
  @Input() chatThread: ChatThread;
  selected = false;

  constructor(
    public chatThreadService: ChatThreadsService,
    public chatViewService: ChatViewManagerService
  ) { }

  ngOnInit() {
    this.chatThreadService.currentThread.subscribe(
      (currentThread: ChatThread) => {
        this.selected = currentThread && this.chatThread &&
        (currentThread._id === this.chatThread._id);
      }
    );
  }
  clicked(event: any): void {
    this.chatThreadService.setCurrentThread(this.chatThread);
    event.preventDefault();
    this.chatViewService.showChatRoom();
  }
}
