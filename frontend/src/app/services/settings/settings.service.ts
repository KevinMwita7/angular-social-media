import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Passwords, Profile } from '../../interfaces/settings.interface';
import { Location } from '../../interfaces/address.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient, private authentication: AuthenticationService) { }
  private uri = 'http://localhost:4000';
  setAddress(newAddress: Location, account_id: string) {
    return this.http.post(`${this.uri}/${account_id}/settings/address`, newAddress);
  }
  changePassword(passwords: Passwords, _id: string) {
    return this.http.put(`${this.uri}/credentials/changepassword/${_id}`, passwords);
  }
  changeProfileDetails(newDetails: Profile, _id: string) {
    const oldUsername = this.authentication.getUserDetails().username;
    return this.http.put(`${this.uri}/profile/update/${_id}/${oldUsername}`, newDetails);
  }
}
