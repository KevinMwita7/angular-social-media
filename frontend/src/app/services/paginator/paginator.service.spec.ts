import { TestBed } from '@angular/core/testing';

import { PaginatorService } from './paginator.service';

describe('PaginaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginatorService = TestBed.get(PaginatorService);
    expect(service).toBeTruthy();
  });
});
