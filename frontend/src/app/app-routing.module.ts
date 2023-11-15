import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {TimeBookingComponent} from "./components/time-booking/time-booking.component";
import {AbsenceComponent} from "./components/absence/absence.component";

const routes: Routes = [
  { path: 'dashboard/:personalnummer', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'time-booking/:personalnummer', component: TimeBookingComponent },
  { path: 'absence/:personalnummer', component: AbsenceComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
