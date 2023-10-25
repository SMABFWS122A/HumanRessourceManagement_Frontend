import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements AfterViewInit {

  daysTag!: HTMLElement;
  currentDate!: HTMLElement;
  prevNextIcon!: NodeListOf<Element>;
  date!: Date;
  currYear!: number;
  currMonth!: number;
  months!: string[];

  constructor() {

  }

  ngAfterViewInit() {
    this.daysTag = document.querySelector(".days") as HTMLElement;
    this.currentDate = document.querySelector(".current-date") as HTMLElement;
    this.prevNextIcon = document.querySelectorAll(".icons span");
    this.date = new Date();
    this.currYear = this.date.getFullYear();
    this.currMonth = this.date.getMonth();
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.renderCalendar();
    this.prevNextIcon.forEach(icon => {
      icon.addEventListener("click", () => {
        this.currMonth = icon.id === "prev" ? this.currMonth - 1 : this.currMonth + 1;
        if (this.currMonth < 0 || this.currMonth > 11) {
          this.date = new Date(this.currYear, this.currMonth, this.date.getDate());
          this.currYear = this.date.getFullYear();
          this.currMonth = this.date.getMonth();
        } else {
          this.date = new Date();
        }
        this.renderCalendar();
      });
    });
  }

  renderCalendar() {
    const firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    const lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li _ngcontent-ng-c800405659 class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday = i === this.date.getDate() && this.currMonth === this.date.getMonth() && this.currYear === this.date.getFullYear() ? "active" : "";
      liTag += `<li _ngcontent-ng-c800405659 class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li _ngcontent-ng-c800405659 class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    this.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
    this.daysTag.innerHTML = liTag;
  }
}



