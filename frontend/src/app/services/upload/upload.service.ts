import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication/authentication.service';

const uri = 'http://localhost:4000';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient,
    private AuthService: AuthenticationService
  ) { }
  username: string = this.AuthService.getUserDetails().username;
  user_id: string = this.AuthService.getUserDetails()._id;
  public upload(files: Set<File>, description): {[key: string]: Observable<number>} {
    const status = {};
    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const req = new HttpRequest('POST', `${uri}/post/images/${this.username}/${this.user_id}/${description.title ? description.title : 'No title'}/${description.description ? description.description : 'No description'}`, formData, {
        reportProgress: true
      });

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
      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    // return the map of progress.observables
    return status;
  }
}
