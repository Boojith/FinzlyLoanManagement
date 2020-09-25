import { Component, OnInit } from '@angular/core';
import { Loan } from '../models/loan';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanService } from '../service/loan.service';
import { AuthService } from '../service/auth.service';


const Loans: Loan[] = [
  {
    customerId:'',
     loanId: 'LUS13566',
     loanAmount: 1200000,
     tradeDate:'21-09-1996',
     startDate: '21-09-1996',
     maturityDate: '21-09-1997',
     loanDuration:12,
     paymentFrequency: 'Quarterly',
     paymentSchedule: 4,
     interestRate: 6.5,
     paymentTerm: 'Even Principal',
     projectedInterest: 20000
  },
  {
    customerId:'',
     loanId: 'LUS13566',
     loanAmount: 1200000,
     tradeDate:'21-09-1996',
     startDate: '21-09-1996',
     maturityDate: '21-09-1997',
     loanDuration:12,
     paymentFrequency: 'Quarterly',
     paymentSchedule: 4,
     interestRate: 6.5,
     paymentTerm: 'Even Principal',
     projectedInterest: 20000
  }
  
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loans:Loan[];
  customerId:string;
  constructor(private router: Router,private loanService:LoanService,private authService:AuthService) {
    
   }

  ngOnInit(): void {
    this.customerId=this.authService.getCustomerId();
    this.loanService.getLoanList(this.customerId).subscribe(data =>{  
      this.loans =data;  
      });  
  }
  navigatePaymentSchedule(loanId:string){
    this.router.navigate([`./payment-schedule`],{ queryParams: { loanId: loanId } });
  }
}
