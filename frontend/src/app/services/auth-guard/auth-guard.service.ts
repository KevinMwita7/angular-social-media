import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
) { }
  public canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
