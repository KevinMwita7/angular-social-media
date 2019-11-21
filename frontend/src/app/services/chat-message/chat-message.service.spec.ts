import { TestBed } from '@angular/core/testing';

import { ChatMessagesService } from './chat-message.service';

describe('ChatMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatMessagesService = TestBed.get(ChatMessagesService);
    expect(service).toBeTruthy();
  });
});
