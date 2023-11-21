import { Component, OnInit } from '@angular/core';
import { UrlParameterService } from "../../services/url-parameter-service.service";
import {HttpClient} from "@angular/common/http";
import {Mitarbeiter} from "../../model/mitarbeiter";
import {Fehlermeldung} from "../../model/fehlermeldung";
import {Gleitzeit} from "../../model/gleitzeit";

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
  urlaubstage!: number;
  gleitzeitsaldo!: number;




  constructor(private urlParameterService: UrlParameterService, private http: HttpClient, private client: HttpClient) {
  }

  ngOnInit() {
    this.personalnummerUrl = this.urlParameterService.getParameter();
      this.client.get<Fehlermeldung>('http://localhost:8080/fehlermeldung/' + this.personalnummerUrl)
        .subscribe(data => {
          this.fehlermeldung.fehlermeldung = data.fehlermeldung;
          alert(this.fehlermeldung.fehlermeldung)
        });

    this.client.get<Mitarbeiter>('http://localhost:8080/mitarbeiter/' + this.personalnummerUrl)
      .subscribe(data => {
        this.mitarbeiterDaten.vorname = data.vorname;
        this.mitarbeiterDaten.nachname = data.nachname;
      });

    this.client.get<number>('http://localhost:8080/urlaubstage/' + this.personalnummerUrl + '/' + new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }))
      .subscribe(data => {
        this.urlaubstage = data;
      });

    this.client.get<Gleitzeit>('http://localhost:8080/gleitzeit/' + this.personalnummerUrl )
      .subscribe(data => {
        this.gleitzeitsaldo = data.gleitzeitsaldo;
      });

  }
}
