import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomGroupComponent } from './chatroom-group.component';

describe('ChatroomGroupComponent', () => {
  let component: ChatroomGroupComponent;
  let fixture: ComponentFixture<ChatroomGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
