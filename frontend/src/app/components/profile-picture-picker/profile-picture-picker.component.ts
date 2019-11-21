import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProfilePictureService } from '../../services/profile-picture/profile-picture.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-profile-picture-picker',
  templateUrl: './profile-picture-picker.component.html',
  styleUrls: ['./profile-picture-picker.component.css']
})
export class ProfilePicturePickerComponent implements OnInit {
  @ViewChild('file') file;
  public pickedFile: File;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  fileName: string;
  constructor(public picturePickerRef: MatDialogRef<ProfilePicturePickerComponent>, public profilePic: ProfilePictureService) { }

  ngOnInit() {
  }

  pickFile() {
    this.file.nativeElement.click();
  }
  onFilePicked() {
    const file: {[key: string]: File} = this.file.nativeElement.files;
    this.file = file;
    this.fileName = this.file['0'].name;
  }
  closePicker() {
    if (this.uploadSuccessful) {
      return this.picturePickerRef.close();
    }
    this.uploading = true;
    this.progress = this.profilePic.upload(this.file);
    this.primaryButtonText = 'Finish';
    this.canBeClosed = false;
    this.picturePickerRef.disableClose = true;
    this.showCancelButton = false;
    forkJoin(this.progress[this.fileName].progress).subscribe(end => {
      this.canBeClosed = true;
      this.picturePickerRef.disableClose = false;
      this.uploadSuccessful = true;
      this.uploading = false;
    });
  }
  onSubmit() {
    if (this.file.nativeElement.files) {
      this.onFilePicked();
    }
  }
}
