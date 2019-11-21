import { TestBed } from '@angular/core/testing';

import { ReactionsService } from './reactions.service';

describe('ReactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReactionsService = TestBed.get(ReactionsService);
    expect(service).toBeTruthy();
  });
});
