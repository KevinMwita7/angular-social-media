import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderReplyThreadComponent } from './render-reply-thread.component';

describe('RenderReplyThreadComponent', () => {
  let component: RenderReplyThreadComponent;
  let fixture: ComponentFixture<RenderReplyThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderReplyThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderReplyThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
