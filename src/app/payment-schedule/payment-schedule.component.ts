import { Component, OnInit } from '@angular/core';
import { PaymentSchedule } from '../models/paymentSchedule';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../service/loan.service';
import { formatDate } from '@angular/common';

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
        this.payments=data.sort(this.compare);
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
    this.loanService.updatePaymentStatus(paymentId).subscribe(()=>{
      console.log("Payment has been updated");
      this.ngOnInit();
    });
  }

   compare( a, b ) {
    var a_part =a.paymentDate.split("-");
    var dateObject1 = new Date(+a_part[2], a_part[1] - 1, +a_part[1]);
    var b_part =b.paymentDate.split("-");
    var dateObject2 = new Date(+b_part[2], b_part[1] - 1, +b_part[1]);
    if (dateObject1.valueOf() < dateObject2.valueOf() ){
      return -1;
    }
    if ( dateObject1.valueOf() > dateObject2.valueOf() ){
      return 1;
    }
    return 0;
  }
  
}
