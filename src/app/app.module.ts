import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoanComponent } from './loan/loan.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentScheduleComponent } from './payment-schedule/payment-schedule.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanComponent,
    CustomerComponent,
    PaymentScheduleComponent,
    HomeComponent,
    LoginComponent,
    AddCustomerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
