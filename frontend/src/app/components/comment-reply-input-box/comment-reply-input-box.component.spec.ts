import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReplyInputBoxComponent } from './comment-reply-input-box.component';

describe('CommentReplyInputBoxComponent', () => {
  let component: CommentReplyInputBoxComponent;
  let fixture: ComponentFixture<CommentReplyInputBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentReplyInputBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentReplyInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
