import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../../model/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  loginResult!: Login;
  constructor(private client: HttpClient) {
  }
  ngOnInit() {
  this.client.get<Login>('http://localhost:8080/login/hansmueller@mail.de')
    .subscribe(data => {
      if (data.email === "hansmueller@mail.de") {
        this.loginResult = data;
        console.log(this.loginResult.passwort)
      } else {
        console.error('Unerwartete Datenstruktur oder Eigenschaft "email" nicht gefunden.');
      }
    });
  }
}
