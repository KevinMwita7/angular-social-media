import { TestBed } from '@angular/core/testing';

import { CommentingSharedService } from './commenting-shared-service.service';

describe('CommentsRepliesSharedServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentingSharedService = TestBed.get(CommentingSharedService);
    expect(service).toBeTruthy();
  });
});
