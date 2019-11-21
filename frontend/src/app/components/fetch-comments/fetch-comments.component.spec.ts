import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCommentsComponent } from './fetch-comments.component';

describe('FetchCommentsComponent', () => {
  let component: FetchCommentsComponent;
  let fixture: ComponentFixture<FetchCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
