import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {

  constructor(private http: HttpClient, private AuthService: AuthenticationService) { }
  uri = 'http://localhost:4000';
  user_id: string = this.AuthService.getUserDetails()._id;
  public upload(file: File): {[key: string]: Observable<number>} {
    const status = {};
    const formData: FormData = new FormData();
    formData.append('file', file['0'], file['0'].name);
    const req = new HttpRequest('POST', `${this.uri}/upload/profilepicture/${this.user_id}`, formData, {reportProgress: true});
    const progress = new Subject<number>();

    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

        const percentageDone = Math.round(event.loaded / event.total * 100);

        // pass the percentage into the progress-stream
        progress.next(percentageDone);
      } else if (event instanceof HttpResponse) {
        progress.complete();
      }
    });

    status[file['0'].name] = {
      progress: progress.asObservable()
    };
    return status;
  }

  public getProfilePicture() {
    return this.http.get(`${this.uri}/profilepicture/${this.user_id}`);
  }
}
