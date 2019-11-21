import { TestBed } from '@angular/core/testing';

import { CommentReplySocketService } from './comment-reply-socket.service';

describe('CommentReplySocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentReplySocketService = TestBed.get(CommentReplySocketService);
    expect(service).toBeTruthy();
  });
});
