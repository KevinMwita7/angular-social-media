import { Component, OnInit, Input } from '@angular/core';
import { Posts } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-render-uploaded-images',
  templateUrl: './render-uploaded-images.component.html',
  styleUrls: ['./render-uploaded-images.component.css']
})
export class RenderUploadedPostComponent implements OnInit {
  @Input() uploadedPosts: Array<Posts>;

  constructor() { }

  ngOnInit() {
  }

}
