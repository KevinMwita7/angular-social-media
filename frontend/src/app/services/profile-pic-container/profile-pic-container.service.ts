import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicContainerService {
  private profilePic: BehaviorSubject<string> =
  new BehaviorSubject<string>('http://localhost:4200/assets/imgs/profile-pic-placeholder.png');
  private profilePicObservable = this.profilePic.asObservable();

  constructor() { }

  setProfilePicture(profilePicUrl: string) {
    this.profilePic.next(profilePicUrl);
  }
  getProfilePic(): Observable<string> {
    return this.profilePicObservable;
  }
}
