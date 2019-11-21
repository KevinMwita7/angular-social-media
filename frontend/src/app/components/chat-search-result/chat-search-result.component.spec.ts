import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSearchResultComponent } from './chat-search-result.component';

describe('ChatSearchResultComponent', () => {
  let component: ChatSearchResultComponent;
  let fixture: ComponentFixture<ChatSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
