import { TestBed } from '@angular/core/testing';

import { ReplyingSharedService } from './replying-shared.service';

describe('ReplyingSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReplyingSharedService = TestBed.get(ReplyingSharedService);
    expect(service).toBeTruthy();
  });
});
