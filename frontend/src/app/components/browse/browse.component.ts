import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseService } from '../../services/browse/browse.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Posts } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit, AfterViewInit {

  constructor(private browse: BrowseService, private router: Router, private progress: NgProgress) { }

  images: Array<Posts>;
  displaySpinner = true;
  noresults = false;
  progressRef: NgProgressRef;
  headers: Object;
  ngOnInit() {
    this.progressRef = this.progress.ref();
   }

   ngAfterViewInit() {
    this.loadImages();
   }

  loadImages() {
    this.progressRef.start();
    this.browse.getPosts().subscribe((response) => {
      this.progressRef.complete();
      const keys = response.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${response.headers.get(key)}`);
      this.images = response.body;
    });
  }
  search(searchTerm) {
    if (!searchTerm.srcElement.value) {
      return;
    }
    this.router.navigate(['browse', 'search'], {queryParams: {query: searchTerm.srcElement.value}, queryParamsHandling: 'merge'});
  }
}
