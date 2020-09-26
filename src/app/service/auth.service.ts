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

  async  login(username: string, password: string) {
    this.customer = await this.loanService.verifyCustomer(username, password).toPromise();
    if(this.customer .customerId!=null){
      this.isloggedIn = true;
    }
    return this.isloggedIn;
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
