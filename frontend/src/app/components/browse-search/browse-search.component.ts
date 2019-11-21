import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Posts } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-browse-search',
  templateUrl: './browse-search.component.html',
  styleUrls: ['./browse-search.component.css']
})
export class BrowseSearchComponent implements OnInit {

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private progress: NgProgress,
    ) { }
  images: Array<Posts>;
  noresults = false;
  progressRef: NgProgressRef;
  defaultImage = '../../../assets/imgs/placeholder.png';

  ngOnInit() {
    this.progressRef = this.progress.ref();
    this.loadImages();
  }
  loadImages() {
    this.progressRef.start();
    this.route.queryParams.subscribe(params => {
      this.searchService.browsePageSearch(params['query']).subscribe((images: Array<Posts>) => {
        if (!images['length']) {
          this.noresults = true;
        } else {
          this.noresults = false;
        }
        this.images = images;
        this.progressRef.complete();
      });
    });
  }

  search(searchbox) {
    if (searchbox.srcElement.value) {
      this.router.navigate(['browse', 'search'], {queryParams: {query: searchbox.srcElement.value}, queryParamsHandling: 'merge'});
      this.loadImages();
    } else {
      return;
    }
  }
}
