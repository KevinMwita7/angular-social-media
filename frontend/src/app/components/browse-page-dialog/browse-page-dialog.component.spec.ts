import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePageDialogComponent } from './browse-page-dialog.component';

describe('BrowsePageDialogComponent', () => {
  let component: BrowsePageDialogComponent;
  let fixture: ComponentFixture<BrowsePageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsePageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
