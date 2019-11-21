import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShowCommentReplyInputBoxSharedService {

  private ShowCommentReplyInputBox: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ShowCommentReplyInputBoxObservable = this.ShowCommentReplyInputBox.asObservable();
  constructor() { }

  public showCommentReplyInputBox(status: boolean) {
    this.ShowCommentReplyInputBox.next(status);
  }
  public commentReplyInputBoxVisibility(): Observable<boolean> {
    return this.ShowCommentReplyInputBoxObservable;
  }
}
