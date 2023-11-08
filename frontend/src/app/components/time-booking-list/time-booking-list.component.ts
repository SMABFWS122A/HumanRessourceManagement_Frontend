import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-booking-list',
  templateUrl: './time-booking-list.component.html',
  styleUrls: ['./time-booking-list.component.css']
})
export class TimeBookingListComponent implements OnInit {

  currentDate!: HTMLElement;
  prevNextIcon!: NodeListOf<Element>;

  currWeekFirstDay!: Date;

  actDate!: Date;
  currDates: Date[] = [];


  timeBookingTyp: string[][] =
    [
      ["Kommen", "Gehen", "Kommen", "Gehen"],
      ["Gehen", "Kommen", "Gehen", "Kommen", "Gehen"],
      ["Kommen", "Gehen", "Kommen", "Gehen"],
      ["Gehen", "Kommen", "Gehen", "Kommen", "Kommen", "Kommen"],
      ["Kommen", "Gehen", "Kommen", "Gehen"],
      [],
      []
    ];
  timeBookingTime: string[][] =
    [
      ["09:12:23", "09:12:23", "09:12:23", "09:12:23"],
      ["09:12:23", "09:12:23", "09:12:23", "09:12:23", "09:12:23"],
      ["09:12:23", "09:12:23", "09:12:23", "09:12:23"],
      ["09:12:23", "09:12:23", "09:12:23", "09:12:23", "09:12:23", "09:12:23"],
      ["09:12:23", "09:12:23", "09:12:23", "09:12:23"],
      [],
      []
    ];
  constructor() {
  }
  ngOnInit() {
    this.currentDate = document.querySelector(".current-date") as HTMLElement;
    this.prevNextIcon = document.querySelectorAll(".icons span");

    this.actDate = new Date();

    this.setActWeekFirstDay(this.actDate);
    this.setCurrDates(this.currWeekFirstDay);

    this.renderTimeBookingList();

    this.prevNextIcon.forEach(icon => {
      icon.addEventListener("click", () => {

        this.currDates = [];
        this.timeBookingTyp = [[],[],[],[],[],[],[]];
        this.timeBookingTime = [[],[],[],[],[],[],[]];

        switch (icon.id) {
          case "today":
            this.setActWeekFirstDay(this.actDate);
            this.setCurrDates(this.currWeekFirstDay);
            break;
          case "prev":
            this.currWeekFirstDay.setDate(this.currWeekFirstDay.getDate() - 7)
            this.setCurrDates(this.currWeekFirstDay);
            break;
          default:
            this.currWeekFirstDay.setDate(this.currWeekFirstDay.getDate() + 7)
            this.setCurrDates(this.currWeekFirstDay);
        }

        this.renderTimeBookingList();
      });
    });
  }

  renderTimeBookingList(){

    this.currentDate.innerText = `${this.currDates[0].toLocaleDateString()} - ${this.currDates[6].toLocaleDateString()}`;
  }

  setActWeekFirstDay(actDate: Date): void{
    const actDay = actDate.getDay() === 0 ? 7 : actDate.getDay();
    const zukuenftigesDatum = new Date();
    zukuenftigesDatum.setDate(this.actDate.getDate() - (actDay-1));
    this.currWeekFirstDay = zukuenftigesDatum;
  }
  setCurrDates(currWeekFirstDay: Date) {
    for(let i = 0; i < 7; i++){
      const dateToAdd: Date = new Date(currWeekFirstDay);
      this.currDates.push(dateToAdd);
      if(i > 0)
        dateToAdd.setDate(dateToAdd.getDate() + (i));
    }
  }

}
