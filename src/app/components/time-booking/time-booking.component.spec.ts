import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBookingComponent } from './time-booking.component';

describe('TimeBookingComponent', () => {
  let component: TimeBookingComponent;
  let fixture: ComponentFixture<TimeBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeBookingComponent]
    });
    fixture = TestBed.createComponent(TimeBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
