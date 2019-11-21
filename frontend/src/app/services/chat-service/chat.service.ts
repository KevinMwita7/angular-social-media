import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';
import * as SocketIO from 'socket.io-client';

import { UserAccount } from '../../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Responsible for fetching conversations the current user has participated in.
 * Also fetches the messages in a thread when a user selects a thread.
 * Holds data returned from the search results in an observable
 */
export class ChatService {
  searchResults: BehaviorSubject<UserAccount[]> = new BehaviorSubject<UserAccount[]>(new Array<UserAccount>());
  searchResultsObservable = this.searchResults.asObservable();
  constructor(private http: HttpClient) { }

  getConversations(currentUserId: string) {
      currentUserId = currentUserId.trim();
      const options = currentUserId ? { params: new HttpParams().set('participant_id', currentUserId)} : {};
      return this.http.get(`http://localhost:4000/privateconversations`, options);
  }

  getThreadMessages(participants: Array<string>) {
    const options = participants[0] && participants[1] ?
    {params: new HttpParams().set('participant_a', participants[0])
    .append('participant_b', participants[1])} : {};
    return this.http.get(`http://localhost:4000/privatemessages`, options);
  }
  getAllMessages(participant_id: string) {
    const options = participant_id ?
    {params: new HttpParams().set('participant_id', participant_id)} : {};
    return this.http.get(`http://localhost:4000/privatemessages/all`, options);
  }
  getFriendsList(user_id: string) {
    const options = user_id ? {params: new HttpParams().set('user_id', user_id)} : {};
    return this.http.get(`http://localhost:4000/chat/friends`, options);
  }
  getSearchResults(): Observable<UserAccount[]> {
    return this.searchResultsObservable;
  }

  setSearchResults(results: UserAccount[]) {
    this.searchResults.next(results);
  }
}
