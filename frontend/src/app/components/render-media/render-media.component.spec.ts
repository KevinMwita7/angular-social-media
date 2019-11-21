import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderMediaComponent } from './render-media.component';

describe('RenderMediaComponent', () => {
  let component: RenderMediaComponent;
  let fixture: ComponentFixture<RenderMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
