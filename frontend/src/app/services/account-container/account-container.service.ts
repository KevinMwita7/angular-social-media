import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';

import { UserAccount } from '../../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountContainerService {
  private account: BehaviorSubject<UserAccount> = new BehaviorSubject<UserAccount>(new UserAccount());
  private accountAsObservable = this.account.asObservable();

  constructor() { }
  getAccount(): Observable<UserAccount> {
    return this.accountAsObservable;
  }
  setAccount(_account: UserAccount) {
    this.account.next(_account);
  }
  clear() {
    this.account.next(new UserAccount());
  }
}
export const accountServiceInjection: Array<any> = [AccountContainerService];
