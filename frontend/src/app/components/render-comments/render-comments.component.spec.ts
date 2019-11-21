import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCommentsComponent } from './render-comments.component';

describe('RenderCommentsComponent', () => {
  let component: RenderCommentsComponent;
  let fixture: ComponentFixture<RenderCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
