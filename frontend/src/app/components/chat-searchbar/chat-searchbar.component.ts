import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../services/search/search.service';
import { ChatService } from '../../services/chat-service/chat.service';
import { ChatViewManagerService } from '../../services/chat-view-manager/chat-view-manager.service';

import { UserAccount } from '../../models/user-account.model';

@Component({
  selector: 'app-chat-searchbar',
  templateUrl: './chat-searchbar.component.html',
  styleUrls: ['./chat-searchbar.component.css']
})
export class ChatSearchBarComponent implements OnInit {
  searchTerm: string;

  constructor(private searchService: SearchService,
    private chatService: ChatService,
    private chatView: ChatViewManagerService) { }

  ngOnInit() {
  }

  search() {
    this.chatView.showSearchResults();
    this.searchService.searchUsers(this.searchTerm).subscribe((results: Array<UserAccount>) => {
      this.chatService.setSearchResults(results);
    });
    this.searchTerm = '';
  }
}
