import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicturePickerComponent } from './profile-picture-picker.component';

describe('ProfilePicturePickerComponent', () => {
  let component: ProfilePicturePickerComponent;
  let fixture: ComponentFixture<ProfilePicturePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePicturePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePicturePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
