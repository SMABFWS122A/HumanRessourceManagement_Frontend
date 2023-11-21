import {Component, OnInit, NgModule} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UrlParameterService} from "../../services/url-parameter-service.service";
import {Zeitbuchung} from "../../model/zeitbuchung";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {TimeBookingComponent} from "../time-booking/time-booking.component";
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  providers: [UrlParameterService]
})
export class PopupComponent implements OnInit{

  personal!: number | null;
  zeitbuchungPost!: Zeitbuchung;
  time!: string;
  inputValue: string = '';
  selectedValue: string = '';
  dateValue: string = '';


  getValue(inputValue: string) {
    this.inputValue = inputValue;
    return inputValue;
  }

  constructor(public dialogRef: MatDialogRef<PopupComponent>,private http: HttpClient, private urlParameterService: UrlParameterService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.personal = data.persNr;
  }

  ngOnInit() {

  }


  buttonClickHandler(buttonID: string){
      this.time = this.getValue(this.inputValue);
      this.setZeitbuchung();
      this.sendData(buttonID);
      this.closeDialog();
  }

  setZeitbuchung():void {
    this.zeitbuchungPost = {
      uhrzeit: this.time,
      datum: this.dateValue,
      buchungsart: this.selectedValue,
      personalnummer: this.personal as number
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

    this.http.post(apiUrl, data, { headers , observe: 'response'}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.error('Bad Request:', error.error);
          // Hier kannst du spezifische Aktionen für den 400-Fehler durchführen
          // Zum Beispiel eine Meldung anzeigen oder spezifische Logik ausführen
          alert('Ungültige Uhrzeit');
        }
        return throwError('Ungültige Uhrzeit');
      })
    ).subscribe((response: any) => {
      console.log('Antwort von der API:', response);
      if (response.status === 200) {
        console.log('Erfolgreich')
      }
      else {
        alert ('Buchung konnte nicht durchgeführt werden')
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
