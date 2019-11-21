import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsInputBoxComponent } from './comments-input-box.component';

describe('CommentsInputBoxComponent', () => {
  let component: CommentsInputBoxComponent;
  let fixture: ComponentFixture<CommentsInputBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsInputBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
