import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanneluserComponent } from './channeluser.component';

describe('ChanneluserComponent', () => {
  let component: ChanneluserComponent;
  let fixture: ComponentFixture<ChanneluserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanneluserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanneluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
