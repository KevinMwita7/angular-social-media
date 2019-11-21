import { TestBed } from '@angular/core/testing';

import { CommentSocketService } from './comment-socket.service';

describe('CommentSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentSocketService = TestBed.get(CommentSocketService);
    expect(service).toBeTruthy();
  });
});
