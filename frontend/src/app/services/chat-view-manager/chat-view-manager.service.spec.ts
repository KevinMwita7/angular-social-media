import { TestBed } from '@angular/core/testing';

import { ChatViewManagerService } from './chat-view-manager.service';

describe('ChatViewManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatViewManagerService = TestBed.get(ChatViewManagerService);
    expect(service).toBeTruthy();
  });
});
