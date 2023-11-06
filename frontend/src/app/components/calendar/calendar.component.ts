import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {

  daysTag!: HTMLElement;
  currentDate!: HTMLElement;
  prevNextIcon!: NodeListOf<Element>;
  date!: Date;
  currYear!: number;
  currMonth!: number;
  months!: string[];

  classes: string[] = [];
  days: number[] = [];

  constructor() {

  }

  ngOnInit() {
    this.daysTag = document.querySelector(".days") as HTMLElement;
    this.currentDate = document.querySelector(".current-date") as HTMLElement;
    this.prevNextIcon = document.querySelectorAll(".icons span");
    this.date = new Date();
    this.currYear = this.date.getFullYear();
    this.currMonth = this.date.getMonth();
    this.months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    this.renderCalendar();
    this.prevNextIcon.forEach(icon => {
      icon.addEventListener("click", () => {
        switch (icon.id) {
          case "today":
            this.date = new Date();
            this.currYear = this.date.getFullYear();
            this.currMonth = this.date.getMonth();
            break;
          case "prev":
            this.currMonth = this.currMonth - 1;
            break;
          default:
            this.currMonth = this.currMonth + 1;
        }

        this.classes = [];
        this.days = [];

        if (this.currMonth < 0 || this.currMonth > 11) {
          const newDate = new Date(this.currYear, this.currMonth, this.date.getDate());
          this.currYear = newDate.getFullYear();
          this.currMonth = newDate.getMonth();
        } else {
          this.date = new Date();
        }
        this.renderCalendar();
      });
    });
  }

  renderCalendar() {
    const firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay() === 0 ? 7 : new Date(this.currYear, this.currMonth, 1).getDay();
    const lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay() === 0 ? 7 : new Date(this.currYear, this.currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();


    for (let i = firstDayofMonth; i > 1; i--) {
      this.classes.push("inactive");
      this.days.push(lastDateofLastMonth - i + 2);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday = i === this.date.getDate() && this.currMonth === this.date.getMonth() && this.currYear === this.date.getFullYear() ? "active" : "";
      this.classes.push(isToday);
      this.days.push(i);
    }

    for (let i = lastDayofMonth; i < 7; i++) {
      this.classes.push("inactive");
      this.days.push(i - lastDayofMonth + 1);
    }
    this.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
  }
}



