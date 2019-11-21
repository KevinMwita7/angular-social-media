import { TestBed } from '@angular/core/testing';

import { ShowCommentReplyInputBoxSharedService } from './show-comment-reply-input-box-shared.service';

describe('ShowCommentReplyInputBoxSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowCommentReplyInputBoxSharedService = TestBed.get(ShowCommentReplyInputBoxSharedService);
    expect(service).toBeTruthy();
  });
});
