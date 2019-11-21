import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UploadService } from '../../services/upload/upload.service';
import { PostTextsService } from '../../services/post-texts/post-texts.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @ViewChild('file') file;
  public files: Set<File> = new Set();
  progress;
  canBeClosed = true;
  primaryButtonText = 'Post';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  showCheckbox = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public uploadService: UploadService,
    private postText: PostTextsService
    ) {}

  ngOnInit() { }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }
  private getTitleAndDescription() {
    return {
        title: document.getElementById('title')['value'].trim(),
        description: document.getElementById('description')['value'].trim()
    };
  }
  postMedia() {
    // if successful, close dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }
    // else start uploading
    this.uploading = true;
    const description = this.getTitleAndDescription();

    this.progress = this.uploadService.upload(this.files, description);
    // convert the progress map into an array
    const allProgressObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }
    this.primaryButtonText = 'Finish';
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;
    this.showCancelButton = false;
    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;
      this.uploadSuccessful = true;
      this.uploading = false;
    });
  }
  onSubmit() {
    if (this.file.nativeElement.files) {
      this.onFilesAdded();
    }
  }
  postTextUpdate() {
    // if successful, close dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }
    // else start posting
    this.uploading = true;
    const description = this.getTitleAndDescription();
    this.progress = this.postText.postText(description);
    const allProgressObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }
    this.primaryButtonText = 'Finish';
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;
    this.showCancelButton = false;
    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;
      this.uploadSuccessful = true;
      this.uploading = false;
    });
  }
  post() {
    if (this.files.size > 0) {
      this.postMedia();
    } else {
      this.postTextUpdate();
    }
  }
}
