import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundUsersComponent } from './found-users.component';

describe('FoundUsersComponent', () => {
  let component: FoundUsersComponent;
  let fixture: ComponentFixture<FoundUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
