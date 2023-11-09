import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlParameterService} from "../../services/url-parameter-service.service";
import {Zeitbuchung} from "../../model/zeitbuchung";
import {Urlaub} from "../../model/urlaub";

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit{
  personalnummerUrl!: number | null;
  urlaubsbuchungPost!: Urlaub;
  startDate!: string;
  endDate!: string;
  absenceType!: string;

  constructor(private http: HttpClient, private urlParameterService: UrlParameterService) {

  }

  ngOnInit() {
    this.personalnummerUrl = this.urlParameterService.getParameter();
  }

  buttonClickHandler(buttonID: string){
    this.setZeitbuchung();
    this.sendData();
  }

  setZeitbuchung():void {
    this.urlaubsbuchungPost = {
      startDate: this.startDate,
      endDate: this.endDate,
      buchungsart: this.absenceType,
      personalnummer: this.personalnummerUrl as number
    };
  }

  sendData() {
    const apiUrl = 'http://localhost:8080/urlaubsbuchung';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const jsonData = {
      startDate: this.urlaubsbuchungPost?.startDate,
      endDate: this.urlaubsbuchungPost?.endDate,
      buchungsart: this.urlaubsbuchungPost?.buchungsart,
      personalnummer: this.urlaubsbuchungPost?.personalnummer
    };

    const data = JSON.stringify(jsonData); // JSON-String erstellen

    this.http.post(apiUrl, data, { headers }).subscribe((response: any) => {
      console.log('Antwort von der API:', response);
    });
  }
}
