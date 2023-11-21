import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBookingListComponent } from './time-booking-list.component';

describe('TimeBookingListComponent', () => {
  let component: TimeBookingListComponent;
  let fixture: ComponentFixture<TimeBookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeBookingListComponent]
    });
    fixture = TestBed.createComponent(TimeBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
