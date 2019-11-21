import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '../../interfaces/address.interface';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-address-contacts-settings',
  templateUrl: './address-contacts-settings.component.html',
  styleUrls: ['./address-contacts-settings.component.css']
})
export class AddressContactsSettingsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private settings: SettingsService
  ) { }
  @Input() owner_id$: string;
  owner_id: string;
  LocationForm: FormGroup;
  LocationFormSubmitted = false;
  location: Location = {
    city: '',
    country: ''
  };

  ngOnInit() {
    this.owner_id = this.owner_id$;
    this.LocationForm = this.formBuilder.group({
      city: [null, Validators.required],
      country: [null, Validators.required],
    });
  }
  get LocationFormFields() {
    return this.LocationForm.controls;
  }
  submitLocation(): void {
    this.LocationFormSubmitted = true;
    if (this.LocationForm.valid) {
      this.location.city = this.LocationFormFields.city.value;
      this.location.country = this.LocationFormFields.country.value;
      this.LocationForm.reset();
      this.LocationFormSubmitted = false;
      this.settings.setAddress(this.location, this.owner_id).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      }, () => {
        console.log('Done setting address');
      });
    }
  }
}
