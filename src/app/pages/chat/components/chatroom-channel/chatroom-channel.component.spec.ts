import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomChannelComponent } from './chatroom-channel.component';

describe('ChatroomChannelComponent', () => {
  let component: ChatroomChannelComponent;
  let fixture: ComponentFixture<ChatroomChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
