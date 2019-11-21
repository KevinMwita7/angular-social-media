import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { PostStats } from '../../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaStatsSharedService {
  private alreadyListening = false;
  private readonly defaultPostStats: PostStats = {
    _id: '',
    likes: 0
  };
  private MediaStatsChangeListener: BehaviorSubject<PostStats> = new BehaviorSubject<PostStats>(this.defaultPostStats);
  private MediaStatsChangeObservable: Observable<PostStats> = this.MediaStatsChangeListener.asObservable();
  public UpdateMediaStatChanges(data: PostStats) {
      this.MediaStatsChangeListener.next(data);
  }
  public getPostStatsChangeObservable(): Observable<PostStats> {
    return this.MediaStatsChangeObservable;
  }
  constructor() { }
}
