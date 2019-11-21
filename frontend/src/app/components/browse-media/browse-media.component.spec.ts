import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseMediaComponent } from './browse-media.component';

describe('BrowseMediaComponent', () => {
  let component: BrowseMediaComponent;
  let fixture: ComponentFixture<BrowseMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
