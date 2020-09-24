import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Loan } from '../models/loan';
import { Customer } from '../models/customer';
import { PaymentSchedule } from '../models/paymentSchedule';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private baseUrl = 'http://localhost:8080/api/';  
  
  constructor(private http:HttpClient) { }  
  
  getLoanList(customerId: string): Observable<Loan[]> {  
    return this.http.get<Loan[]>(`${this.baseUrl}`+'/loans/'+`${customerId}`); 
  }
  getCustomerDetails(customerId: string): Observable<Customer> {  
    return this.http.get<Customer>(`${this.baseUrl}`+'/customer/'+`${customerId}`); 
  }  

  getPaymentSchedule(loanId: string): Observable<PaymentSchedule[]> {  
    return this.http.get<PaymentSchedule[]>(`${this.baseUrl}`+'/loan/paymentSchedule/'+`${loanId}`); 
  }

  saveLoan(loan: object): Observable<Loan> {  
    //console.log(this.http.post<Loan>(`${this.baseUrl}`+'/loan', loan));
    console.log(`${this.baseUrl}`+'/loan');
    return this.http.post<Loan>(`${this.baseUrl}`+'/loan', loan);  
  }
  
  saveCustomer(customer: Customer): Observable<Customer> {  
    //console.log(this.http.post<Loan>(`${this.baseUrl}`+'/loan', loan));
    console.log(`${this.baseUrl}`+'/add-customer');
    return this.http.post<Customer>(`${this.baseUrl}`+'/add-customer', customer);  
  }  
  
}
