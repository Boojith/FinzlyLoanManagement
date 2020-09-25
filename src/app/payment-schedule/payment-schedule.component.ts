import { Component, OnInit } from '@angular/core';
import { PaymentSchedule } from '../models/paymentSchedule';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../service/loan.service';

// const payments: PaymentSchedule[] = [
//   {
//      loanId: '',
//      paymentDate: '21-12-1996',
//      principal: 200000,
//      projectedInterest: 3000,
//      paymentStatus: 'PROJECTED',
//      paymentAmount: 21000
//   },
//   {
//     loanId: '',
//     paymentDate: '21-03-1997',
//     principal: 180000,
//     projectedInterest:6000 ,
//     paymentStatus: 'AWAITINGPAYMENT',
//     paymentAmount: 21000
//   },
//   {
//     loanId: '',
//     paymentDate: '21-06-1997',
//     principal: 180000,
//     projectedInterest:6000 ,
//     paymentStatus: 'PAID',
//     paymentAmount: 21000
//   }
// ];


@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.css']
})
export class PaymentScheduleComponent implements OnInit {
  payments:PaymentSchedule[] ;
  loanId:string;
  constructor(private activatedRoute: ActivatedRoute,private loanService:LoanService) { }

  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe(params => {
      this.loanId=params['loanId'];
      this.loanService.getPaymentSchedule(this.loanId).subscribe(data=>
      {
        this.payments=data;
      })
    });
  }

  getClass(paymentStatus:string){
    var classList='';
    if(paymentStatus=='PROJECTED'){
       classList = 'badge badge-primary'; 
    }else if (paymentStatus=='AWAITINGPAYMENT'){
        classList = 'badge badge-warning';
    }else if(paymentStatus=='PAID'){
        classList = 'badge badge-success';
    }
    return classList;
  }
  
}
