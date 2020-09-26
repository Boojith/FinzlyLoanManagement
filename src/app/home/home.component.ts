import { Component, OnInit } from '@angular/core';
import { Loan } from '../models/loan';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanService } from '../service/loan.service';
import { AuthService } from '../service/auth.service';


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
      this.loans =data.sort(this.compare);  
      });  
  }
  navigatePaymentSchedule(loanId:string){
    this.router.navigate([`./payment-schedule`],{ queryParams: { loanId: loanId } });
  }

  compare( a, b ) {
    var a_part =a.startDate.split("-");
    var dateObject1 = new Date(+a_part[2], a_part[1] - 1, +a_part[1]);
    var b_part =b.startDate.split("-");
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
