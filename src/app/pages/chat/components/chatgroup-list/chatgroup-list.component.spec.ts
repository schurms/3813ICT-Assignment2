import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatgroupListComponent } from './chatgroup-list.component';

describe('ChatgroupListComponent', () => {
  let component: ChatgroupListComponent;
  let fixture: ComponentFixture<ChatgroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatgroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatgroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
