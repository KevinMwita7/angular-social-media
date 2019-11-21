import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Posts } from '../../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
/**
 * Holds functions responsible for submit search queries to the backend and awaiting results.
 */
export class SearchService {

    constructor(private http: HttpClient) { }

    private uri = 'http://localhost:4000';

    // Responsible for making search queries to the backend when user is in the browse page
    browsePageSearch(searchterm: string): Observable<Array<Posts>> {
      searchterm = searchterm.trim();
      // Add safe, URL encoded search parameter if there is a search term
      const options = searchterm ? { params: new HttpParams().set('term', searchterm)} : {};
      return this.http.get<Array<Posts>>(`${this.uri}/browse/search`, options);
    }
    // Responsible for making search queries to the backend for users when a user is logged in
    searchUsers(searchterm: string) {
      searchterm = searchterm.trim();
      const options = searchterm ? {params: new HttpParams().set('name', searchterm)} : {};
      return this.http.get(`${this.uri}/search/users`, options);
    }
    // Responsible for making search queries to the backend for posts when a user is logged in
    searchPosts(searchterm: string, searcher_id: string) {
      searchterm = searchterm.trim();
      const options = searchterm ? {params: new HttpParams().set('term', searchterm).append('searcher_id', searcher_id)} : {};
      return this.http.get(`${this.uri}/search/posts`, options);
    }
}
