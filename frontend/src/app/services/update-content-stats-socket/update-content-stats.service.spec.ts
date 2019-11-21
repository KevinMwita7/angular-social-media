import { TestBed } from '@angular/core/testing';

import { UpdateContentStatsService } from './update-content-stats.service';

describe('UpdateContentStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateContentStatsService = TestBed.get(UpdateContentStatsService);
    expect(service).toBeTruthy();
  });
});
