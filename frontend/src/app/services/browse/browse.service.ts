import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from '../../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<HttpResponse<Array<Posts>>> {
   return this.http.get<Array<Posts>>('http://localhost:4000/browse/images', {observe: 'response'});
  }
}
