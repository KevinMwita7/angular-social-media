import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // `currentUser` contains the current user
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
  constructor() { }
}

export const userServiceInjectables: Array<any> = [
  UsersService
];
