import { Component, OnInit } from '@angular/core';
import { UrlParameterService } from "../../services/url-parameter-service.service";
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-minimal-header',
  templateUrl: './minimal-header.component.html',
  styleUrls: ['./minimal-header.component.css'],
  providers: [UrlParameterService]
})
export class MinimalHeaderComponent implements OnInit {

  personalnummerUrl!: string;

  constructor(private router: Router) {
    this.router.events.subscribe((e: Event) => {
      const currentUrl = this.router.url;
      const urlParts = currentUrl.split('/');
      this.personalnummerUrl = urlParts[2];
    });
  }

  ngOnInit() {

  }
}
