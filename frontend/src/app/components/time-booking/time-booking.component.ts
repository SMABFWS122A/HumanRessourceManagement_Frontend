import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from "../popup/popup.component";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Zeitbuchung } from "../../model/zeitbuchung";
import { UrlParameterService } from "../../services/url-parameter-service.service";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
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

  constructor(public dialog: MatDialog, private http: HttpClient, private urlParameterService: UrlParameterService, private zone: NgZone) {}

  ngOnInit() {
    this.personalnummerUrl = this.urlParameterService.getParameter();
  }

  buttonClickHandler(buttonID: string){
    this.time = new Date().toLocaleTimeString();
    if (buttonID === "Kommen") {
      this.setZeitbuchung(buttonID);
      this.sendData(buttonID);
    } else {
      this.setZeitbuchung(buttonID);
      this.sendData(buttonID);
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

  sendData(buttonID:string) {
    const apiUrl = 'http://localhost:8080/zeitbuchung';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const jsonData = {
      uhrzeit: this.zeitbuchungPost?.uhrzeit,
      datum: this.zeitbuchungPost?.datum,
      buchungsart: this.zeitbuchungPost?.buchungsart,
      personalnummer: this.zeitbuchungPost?.personalnummer
    };

    const data = JSON.stringify(jsonData); // JSON-String erstellen


    this.http.post(apiUrl, data, { headers, observe:'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.error('Bad Request:', error.error);
            alert('Ungültige Uhrzeit')
          }
          return throwError('Ungültige Uhrzeit');
        })
      ).subscribe((response:any) => {
      this.reloadPage();
      if (response.status === 200) {
        alert(buttonID + " wurde gestempelt um " + this.time);
      }
      else {
        alert ('Buchung konnte nicht durchgeführt werden')
      }
    });
  }

  dateFormatter(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  reloadPage(): void {
    this.zone.run(() => {
      location.reload();
    });
  }
}
