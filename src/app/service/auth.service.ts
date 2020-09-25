import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoanService } from './loan.service';
import { Customer } from '../models/customer';



@Injectable()
export class AuthService {

  private isloggedIn: boolean;
  private customer: Customer;

  constructor(private loanService: LoanService) {
    this.isloggedIn = false;
  }

  login(username: string, password: string) {
    this.loanService.verifyCustomer(username, password).subscribe(data => {
      this.customer = data;
      if (this.customer.customerId != null) {
        this.isloggedIn = true;
      }
    });
    return of(this.isloggedIn);
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }

  getCustomerId(): string {
    return this.customer.customerId;
  }

  logoutUser(): void {
    this.isloggedIn = false;
  }

}
