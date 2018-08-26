import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomHistoryComponent } from './chatroom-history.component';

describe('ChatroomHistoryComponent', () => {
  let component: ChatroomHistoryComponent;
  let fixture: ComponentFixture<ChatroomHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
