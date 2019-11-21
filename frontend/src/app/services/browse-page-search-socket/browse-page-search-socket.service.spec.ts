import { TestBed } from '@angular/core/testing';

import { BrowsePageSearchSocketService } from './browse-page-search-socket.service';

describe('BrowsePageSearchSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrowsePageSearchSocketService = TestBed.get(BrowsePageSearchSocketService);
    expect(service).toBeTruthy();
  });
});
