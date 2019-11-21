import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCommentRepliesComponent } from './fetch-comment-replies.component';

describe('FetchCommentRepliesComponent', () => {
  let component: FetchCommentRepliesComponent;
  let fixture: ComponentFixture<FetchCommentRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchCommentRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchCommentRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
