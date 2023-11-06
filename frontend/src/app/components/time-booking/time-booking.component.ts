import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PopupComponent} from "../popup/popup.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Zeitbuchung } from "../../model/zeitbuchung";
import { UrlParameterService } from "../../services/url-parameter-service.service";
@Component({
  selector: 'app-time-booking',
  templateUrl: './time-booking.component.html',
  styleUrls: ['./time-booking.component.css'],
  providers: [UrlParameterService]
})
export class TimeBookingComponent implements OnInit{

  personalnummerUrl!: number | null;
  zeitbuchungPost!: Zeitbuchung;
  time!: string;



  constructor(public dialog: MatDialog, private http: HttpClient, private urlParameterService: UrlParameterService) {}

  ngOnInit() {
    this.personalnummerUrl = this.urlParameterService.getParameter();
  }

  buttonClickHandler(buttonID: string){
    this.time = new Date().toLocaleTimeString();
    if (buttonID === "kommen") {
      alert("Kommen wurde gestempelt um " + this.time);
      this.setZeitbuchung(buttonID);
      this.sendData();
    } else {
      alert("Gehen wurde gestempelt um " + new Date());
      this.setZeitbuchung(buttonID);
      this.sendData();
    }
  }
  openDialog(): void {
    this.dialog.open(PopupComponent, {
      data: { persNr : this.personalnummerUrl }
    });
  }

  setZeitbuchung(buttonID: string):void {
    this.zeitbuchungPost = {
      uhrzeit: this.time,
      datum: this.dateFormatter(),
      buchungsart: buttonID,
      personalnummer: this.personalnummerUrl as number
    };
  }

  sendData() {
    const apiUrl = 'http://localhost:8080/zeitbuchung';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const jsonData = {
      uhrzeit: this.zeitbuchungPost?.uhrzeit,
      datum: this.zeitbuchungPost?.datum,
      buchungsart: this.zeitbuchungPost?.buchungsart,
      personalnummer: this.zeitbuchungPost?.personalnummer
    };

    const data = JSON.stringify(jsonData); // JSON-String erstellen

    this.http.post(apiUrl, data, { headers }).subscribe((response: any) => {
      console.log('Antwort von der API:', response);
    });
  }

  dateFormatter(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
