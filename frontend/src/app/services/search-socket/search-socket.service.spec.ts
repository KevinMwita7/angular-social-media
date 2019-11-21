import { TestBed } from '@angular/core/testing';

import { SearchSocketService } from './search-socket.service';

describe('SearchSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchSocketService = TestBed.get(SearchSocketService);
    expect(service).toBeTruthy();
  });
});
