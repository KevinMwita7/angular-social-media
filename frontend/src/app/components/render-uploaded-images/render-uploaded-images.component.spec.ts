import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderUploadedPostComponent } from './render-uploaded-images.component';

describe('RenderUploadedPostComponent', () => {
  let component: RenderUploadedPostComponent;
  let fixture: ComponentFixture<RenderUploadedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderUploadedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderUploadedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
