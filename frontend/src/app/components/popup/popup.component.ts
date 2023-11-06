import {Component, OnInit, NgModule} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlParameterService} from "../../services/url-parameter-service.service";
import {Zeitbuchung} from "../../model/zeitbuchung"
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  providers: [UrlParameterService]
})
export class PopupComponent implements OnInit{

  personalnummerUrl!: number | null;
  zeitbuchungPost!: Zeitbuchung;
  time!: string;
  inputValue: string = '';
  selectedValue: string = '';
  dateValue: string = '';

  getValue(inputValue: string) {
    this.inputValue = inputValue;
    return inputValue;
  }

  constructor(public dialogRef: MatDialogRef<PopupComponent>,private http: HttpClient, private urlParameterService: UrlParameterService) {
  }

  ngOnInit() {

  }


  buttonClickHandler(buttonID: string){
      this.time = this.getValue(this.inputValue);
      this.setZeitbuchung();
      this.sendData();
      this.closeDialog();
  }

  setZeitbuchung():void {
    this.zeitbuchungPost = {
      uhrzeit: this.time,
      datum: this.dateValue,
      buchungsart: this.selectedValue,
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
  closeDialog(): void {
    this.dialogRef.close();
  }
}
