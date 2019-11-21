import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private uri = 'http://localhost:4000';

  fetchAccount(secondary_key) {
    return this.http.get(`${this.uri}/account/${secondary_key}`);
  }

  fetchImageUploads(secondary_key) {
    return this.http.get(`${this.uri}/uploads/images/${secondary_key}`);
  }

  fetchLocation(secondary_key) {
    return this.http.get(`${this.uri}/addresses/${secondary_key}`);
  }
}
