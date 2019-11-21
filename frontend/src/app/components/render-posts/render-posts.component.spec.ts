import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderPostsComponent } from './render-posts.component';

describe('RenderPostsComponent', () => {
  let component: RenderPostsComponent;
  let fixture: ComponentFixture<RenderPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
