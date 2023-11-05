import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UrlParameterService {

  constructor(private route: ActivatedRoute) {
  }

  getParameter(): number | null {
    const personalnummerFromUrl = this.route.snapshot.paramMap.get('personalnummer')
    if (personalnummerFromUrl !== null && !isNaN(+personalnummerFromUrl)) {
      return +personalnummerFromUrl;
    } else {
      return null;
    }
  }
}
