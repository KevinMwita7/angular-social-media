import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';
import { HttpParams } from '@angular/common/http';
import { Posts } from '../../interfaces/posts.interface';
import { Observable, observable } from 'rxjs';

const uri = 'http://localhost:4000/search';

@Injectable({
  providedIn: 'root'
})

export class SearchSocketService {
  constructor() { }
  private socket: any;
  public initSocket() {
    this.socket = SocketIO(uri);
  }
  public search(query: string, searcher_id: string) {
    query = query.trim();
    if (query) {
      let params = new HttpParams().set('query', query);
      params = params.append('searcher_id', searcher_id);
      this.socket.emit('search query', params);
    } else { return; }
  }
  public onPostSearchResult(): Observable<Posts> {
    return new Observable<Posts>(observable => {
      this.socket.on('search result', (data: Posts) => observable.next(data));
    });
  }
}
