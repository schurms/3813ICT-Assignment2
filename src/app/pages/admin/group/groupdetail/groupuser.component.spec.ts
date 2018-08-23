import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupuserlComponent } from './groupuserl.component';

describe('GroupuserlComponent', () => {
  let component: GroupuserlComponent;
  let fixture: ComponentFixture<GroupuserlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupuserlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupuserlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
