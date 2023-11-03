import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PopupComponent} from "../popup/popup.component";
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Zeitbuchung } from "../../model/zeitbuchung";
@Component({
  selector: 'app-time-booking',
  templateUrl: './time-booking.component.html',
  styleUrls: ['./time-booking.component.css']
})
export class TimeBookingComponent implements OnInit{

  idURL!: number | null;
  zeitbuchungPost!: Zeitbuchung;
  time!: string;



  constructor(public dialog: MatDialog, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const idFromUrl = this.route.snapshot.paramMap.get('id');
    if (idFromUrl !== null && !isNaN(+idFromUrl)) {
      this.idURL = +idFromUrl;
    } else {
      this.idURL = null;
    }
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
    const dialogRef = this.dialog.open(PopupComponent);

  }

  setZeitbuchung(buttonID: string):void {
    this.zeitbuchungPost = {
      uhrzeit: this.time,
      datum: this.dateFormatter(),
      buchungsart: buttonID,
      personalnummer: this.idURL as number
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
