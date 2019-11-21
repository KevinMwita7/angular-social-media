import { TestBed } from '@angular/core/testing';

import { PostTextsService } from './post-texts.service';

describe('PostTextsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostTextsService = TestBed.get(PostTextsService);
    expect(service).toBeTruthy();
  });
});
