import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ReactionsService } from '../../services/reactions/reactions.service';
import { PostModel } from '../../models/image.model';
import { MediaStatsSharedService } from '../../services/media-stats/media-stats-shared.service';
import { RenderHqImageComponent } from '../render-hq-image/render-hq-image.component';
import { PostStats } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-render-specific-post',
  templateUrl: './render-specific-post.component.html',
  styleUrls: ['./render-specific-post.component.css']
})
export class RenderSpecificMediaComponent implements OnInit {
  @Input() post: PostModel;
  @Input() reactorId: string;
  defaultImage = 'http://localhost:4200/assets/imgs/placeholder.png';
  likesAmount: number;
  constructor(
    private router: Router,
    private reactionsService: ReactionsService,
    private dialog: MatDialog,
    private MediaStatsService: MediaStatsSharedService
  ) { }

  ngOnInit() {
    this.likesAmount = this.post.likes;
    this.initRealTimeStatsConnection();
  }
  reaction() {
    if (this.post.isLiked()) {
      this.post.unlike();
      this.reactionsService.unlikePost(this.post._id, this.reactorId, this.post.type).subscribe(success => {
        console.log(success);
      }, (error) => {
       if (error) {
         console.log(error);
        }
      });
    } else {
      this.post.like();
      this.reactionsService.likePost(this.post._id, this.reactorId, this.post.type).subscribe(success => {
        console.log(success);
      }, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  }
  viewProfile() {
    this.router.navigate([this.post.uploader_id]);
  }
  getHqImage() {
    this.dialog.closeAll();
    this.dialog.open(RenderHqImageComponent, {
      data: this.post,
      width: '75%'
    });
  }
  private initRealTimeStatsConnection() {
    this.MediaStatsService.getPostStatsChangeObservable().subscribe((data: PostStats) => {
      this.post.updateLikes(data);
    });
  }
  getRelativeTime(time: string) {
    return moment(time).fromNow();
  }
}
