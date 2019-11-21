import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressContactsSettingsComponent } from './address-contacts-settings.component';

describe('AddressContactsSettingsComponent', () => {
  let component: AddressContactsSettingsComponent;
  let fixture: ComponentFixture<AddressContactsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressContactsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressContactsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
