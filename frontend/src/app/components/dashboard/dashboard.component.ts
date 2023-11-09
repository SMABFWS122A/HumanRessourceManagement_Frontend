import { Component, OnInit } from '@angular/core';
import { UrlParameterService } from "../../services/url-parameter-service.service";
import {HttpClient} from "@angular/common/http";
import {Mitarbeiter} from "../../model/mitarbeiter";
import {Fehlermeldung} from "../../model/fehlermeldung";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UrlParameterService]
})
export class DashboardComponent implements OnInit {

  personalnummerUrl!: number | null;
  mitarbeiterDaten: Mitarbeiter = {};
  fehlermeldung: Fehlermeldung = {};

  constructor(private urlParameterService: UrlParameterService, private http: HttpClient, private client: HttpClient) {
  }

  ngOnInit() {
    this.personalnummerUrl = this.urlParameterService.getParameter();

    this.client.get<Fehlermeldung>('http://localhost:8080/fehlermeldung/' + this.personalnummerUrl)
      .subscribe(data => {
        this.fehlermeldung.meldung = data.meldung;
      });

    this.http.post('http://localhost:8080/fehlermeldung/' + this.personalnummerUrl ,{ observe:'response' }).subscribe((response:any) => {
      console.log('Antwort von der API:', response);
      console.dir(response);
      if (response.status === 400) {
        alert (this.fehlermeldung.meldung);
      }
    });


    this.client.get<Mitarbeiter>('http://localhost:8080/mitarbeiter/' + this.personalnummerUrl)
      .subscribe(data => {
        this.mitarbeiterDaten.vorname = data.vorname;
        this.mitarbeiterDaten.nachname = data.nachname;
      });
  }
}
