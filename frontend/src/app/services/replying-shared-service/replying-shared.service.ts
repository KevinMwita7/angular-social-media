import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class ReplyingSharedService {
  private ListenForReplies: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ListenForRepliesObservable = this.ListenForReplies.asObservable();
  private alreadyListening = false;
  constructor() { }

  public startListeningForComments(status: boolean) {
    if (!this.alreadyListening) {
      this.alreadyListening = true;
      this.ListenForReplies.next(status);
    } else { return; }
  }
  public getListeningForRepliesStatus(): Observable<boolean> {
    return this.ListenForRepliesObservable;
  }
}
