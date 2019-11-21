import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * contains BehaviourSubjects that inform the chat component on which view to render
 */
export class ChatViewManagerService {
  // start with only the convesations been visible
  private conversations: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private searchResults: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private chatRoom: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  conversationsViewObservable(): Observable<boolean> {
    return this.conversations.asObservable();
  }
  searchResultsViewObservable(): Observable<boolean> {
    return this.searchResults.asObservable();
  }
  chatRoomViewObservable(): Observable<boolean> {
    return this.chatRoom.asObservable();
  }
  showConversations() {
    this.conversations.next(true);
    this.searchResults.next(false);
    this.chatRoom.next(false);
  }
  showSearchResults() {
    this.conversations.next(false);
    this.searchResults.next(true);
    this.chatRoom.next(false);
  }
  showChatRoom() {
    this.conversations.next(false);
    this.searchResults.next(false);
    this.chatRoom.next(true);
  }

}
