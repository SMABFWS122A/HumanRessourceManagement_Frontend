import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../../model/login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  loginResult!: Login;
  constructor(private client: HttpClient, private router: Router) {
  }
  ngOnInit() {

  }
  confirmLogin() {
    let emailInput!: HTMLInputElement;
    let passwordInput!: HTMLInputElement;

    emailInput = document.getElementById('uname') as HTMLInputElement;
    passwordInput = document.getElementById('psw') as HTMLInputElement;

    this.client.get<Login>('http://localhost:8080/login/' + emailInput.value as string)
      .subscribe(data => {
        if (data.passwort === passwordInput.value as string) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Eigenschaft "email" nicht gefunden.')
        }
      });

  }
}

