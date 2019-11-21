import { TestBed } from '@angular/core/testing';

import { ChatThreadsService } from './chat-thread.service';

describe('ChatThreadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatThreadsService = TestBed.get(ChatThreadsService);
    expect(service).toBeTruthy();
  });
});
