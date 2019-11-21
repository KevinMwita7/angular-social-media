import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostModel } from '../../models/image.model';

@Component({
  selector: 'app-render-hq-image',
  templateUrl: './render-hq-image.component.html',
  styleUrls: ['./render-hq-image.component.css']
})
export class RenderHqImageComponent implements OnInit {
  @ViewChild('image') image;
  constructor(
    public dialogRef: MatDialogRef<RenderHqImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostModel
    ) { }

  ngOnInit() { }

}
