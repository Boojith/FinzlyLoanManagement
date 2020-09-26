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
      this.loans =data;  
      });  
  }
  navigatePaymentSchedule(loanId:string){
    this.router.navigate([`./payment-schedule`],{ queryParams: { loanId: loanId } });
  }
}
