import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderSpecificMediaComponent } from './render-specific-post.component';

describe('RenderSpecificMediaComponent', () => {
  let component: RenderSpecificMediaComponent;
  let fixture: ComponentFixture<RenderSpecificMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderSpecificMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderSpecificMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
