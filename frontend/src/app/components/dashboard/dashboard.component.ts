import { Component, OnInit } from '@angular/core';
import { UrlParameterService } from "../../services/url-parameter-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UrlParameterService]
})
export class DashboardComponent implements OnInit {

  personalnummerUrl!: number | null;

  constructor(private urlParameterService: UrlParameterService) {
  }

  ngOnInit() {
    this.personalnummerUrl = this.urlParameterService.getParameter();
  }
}
