import { TestBed } from '@angular/core/testing';

import { MediaStatsSharedService } from './media-stats-shared.service';

describe('MediaStatsSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaStatsSharedService = TestBed.get(MediaStatsSharedService);
    expect(service).toBeTruthy();
  });
});
