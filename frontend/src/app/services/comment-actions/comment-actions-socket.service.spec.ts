import { TestBed } from '@angular/core/testing';

import { CommentActionsSocketService } from './comment-actions-socket.service';

describe('CommentActionsSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentActionsSocketService = TestBed.get(CommentActionsSocketService);
    expect(service).toBeTruthy();
  });
});
