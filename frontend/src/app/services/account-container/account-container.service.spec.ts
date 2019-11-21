import { TestBed } from '@angular/core/testing';

import { AccountContainerService } from './account-container.service';

describe('AccountContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountContainerService = TestBed.get(AccountContainerService);
    expect(service).toBeTruthy();
  });
});
