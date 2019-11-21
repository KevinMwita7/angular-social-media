import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../../models/image.model';
import { MediaStatsSharedService } from '../../services/media-stats/media-stats-shared.service';
import { UpdateContentStatsService } from '../../services/update-content-stats-socket/update-content-stats.service';
import { PostStats } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-render-media',
  templateUrl: './render-media.component.html',
  styleUrls: ['./render-media.component.css']
})
export class RenderMediaComponent implements OnInit {
  @Input() posts: Array<PostModel>;
  @Input() reactor_id: string;
  constructor(
    private MediaStatsService: MediaStatsSharedService,
    private UpdateContentStats: UpdateContentStatsService
  ) { }

  ngOnInit() {
    this.initConnections();
   }
  private initConnections() {
    this.UpdateContentStats.initSocket();
    this.UpdateContentStats.onContentLikesChange().subscribe((data: PostStats) => {
      this.MediaStatsService.UpdateMediaStatChanges(data);
    });
  }
  public trackElement(index: string, element: PostModel) {
    return element ? element._id : null;
  }
}
