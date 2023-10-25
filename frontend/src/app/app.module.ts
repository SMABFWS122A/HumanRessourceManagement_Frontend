import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MinimalHeaderComponent } from './components/minimal-header/minimal-header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import {ClockComponent} from "./components/clock/clock.component";
import { TimeBookingComponent } from './components/time-booking/time-booking.component';
import { AbsenceComponent } from './components/absence/absence.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MinimalHeaderComponent,
    DashboardComponent,
    CalendarComponent,
    DashboardComponent,
    ClockComponent,
    TimeBookingComponent,
    AbsenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
