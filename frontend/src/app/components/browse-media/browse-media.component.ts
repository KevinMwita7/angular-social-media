import { Component, OnInit, Input } from '@angular/core';
import { Posts } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-browse-media',
  templateUrl: './browse-media.component.html',
  styleUrls: ['./browse-media.component.css']
})
export class BrowseMediaComponent implements OnInit {
  @Input() images: Array<Posts>;
  constructor() { }
  defaultImage = '../../../assets/imgs/placeholder.png';
  ngOnInit() {
  }

}
