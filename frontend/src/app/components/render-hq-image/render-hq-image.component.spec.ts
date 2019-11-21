import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderHqImageComponent } from './render-hq-image.component';

describe('RenderHqImageComponent', () => {
  let component: RenderHqImageComponent;
  let fixture: ComponentFixture<RenderHqImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderHqImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderHqImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
