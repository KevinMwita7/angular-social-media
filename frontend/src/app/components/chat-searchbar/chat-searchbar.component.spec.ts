import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSearchBarComponent } from './chat-searchbar.component';

describe('ChatSearchBarComponent', () => {
  let component: ChatSearchBarComponent;
  let fixture: ComponentFixture<ChatSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
