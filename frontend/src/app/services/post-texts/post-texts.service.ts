import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TextPost } from '../../interfaces/text-post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostTextsService {

  constructor(
    private http: HttpClient,
    private AuthService: AuthenticationService,
  ) { }

  private uri = 'http://loaclhost:4000';

  public postText(titleAndDescription: object): {[key: string]: Observable<number>} {
  const status = {};

  const post: TextPost = {
      uploader_id: this.AuthService.getUserDetails()._id,
      uploader: this.AuthService.getUserDetails().username,
      title: titleAndDescription['title'],
      description: titleAndDescription['description'],
  };

  const progress = new Subject<number>();

  const req = new HttpRequest('POST', `${this.uri}/post/text`, post, {
    reportProgress: true
  });

  this.http.request(req).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      const percentageDone = Math.round(event.loaded / event.total * 100);
      progress.next(percentageDone);
    } else if (event instanceof HttpResponse) {
      progress.complete();
    }
  });

  status['Progress: '] = {
    progress: progress.asObservable()
  };

  return status;
}
}
