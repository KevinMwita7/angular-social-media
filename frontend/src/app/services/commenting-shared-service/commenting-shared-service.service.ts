import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentingSharedService {
  private ListenForComments: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ListenForCommentsObservable = this.ListenForComments.asObservable();
  private alreadyListening = false;
  constructor() { }

  public startListeningForComments(status: boolean) {
    if (!this.alreadyListening) {
      this.alreadyListening = true;
      this.ListenForComments.next(status);
    } else { return; }
  }
  public getListenForCommentsStatus(): Observable<boolean> {
    return this.ListenForCommentsObservable;
  }
}
