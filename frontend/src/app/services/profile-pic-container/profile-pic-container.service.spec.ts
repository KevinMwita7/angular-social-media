import { TestBed } from '@angular/core/testing';

import { ProfilePicContainerService } from './profile-pic-container.service';

describe('ProfilePicContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilePicContainerService = TestBed.get(ProfilePicContainerService);
    expect(service).toBeTruthy();
  });
});
