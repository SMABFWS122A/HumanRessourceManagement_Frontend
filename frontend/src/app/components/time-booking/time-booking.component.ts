import { Component } from '@angular/core';

@Component({
  selector: 'app-time-booking',
  templateUrl: './time-booking.component.html',
  styleUrls: ['./time-booking.component.css']
})
export class TimeBookingComponent {
  buttonClickHandler(buttonID: string){
    let time = new Date().toLocaleTimeString();
    if (buttonID === "comming") {
      alert("Kommen wurde gestempelt um " + time);
    } else {
      alert("Gehen wurde gestempelt um " + time);
    }
  }

}
