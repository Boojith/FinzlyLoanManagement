import { Component, OnInit } from '@angular/core';
import { PaymentSchedule } from '../models/paymentSchedule';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../service/loan.service';

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

  changePaymentStatus(event,paymentId){
    console.log("event:"+event);
    console.log("paymentId:"+paymentId);
    this.loanService.updatePaymentStatus(4).subscribe(()=>{
      console.log("Payment has been updated");
      this.ngOnInit();
    });
  }
  
}
