import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit{

  currentTime!: Date;

   constructor() { }

   ngOnInit() {
     this.updateClock();
     setInterval(() => this.updateClock(), 1000);
   }

   updateClock() {
     this.currentTime = new Date();
   }
}
