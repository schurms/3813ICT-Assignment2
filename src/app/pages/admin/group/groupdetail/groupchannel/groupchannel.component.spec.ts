import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchannelComponent } from './groupchannel.component';

describe('GroupchannelComponent', () => {
  let component: GroupchannelComponent;
  let fixture: ComponentFixture<GroupchannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupchannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupchannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
