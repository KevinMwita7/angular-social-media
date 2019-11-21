import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePageNavbarComponent } from './browse-page-navbar.component';

describe('BrowsePageNavbarComponent', () => {
  let component: BrowsePageNavbarComponent;
  let fixture: ComponentFixture<BrowsePageNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsePageNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
