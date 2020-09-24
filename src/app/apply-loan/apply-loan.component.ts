import { Component, OnInit } from '@angular/core';
import { Loan } from '../models/loan';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyLoanComponent implements OnInit {
  loanForm: FormGroup;
  model=new Loan();
  today = new Date();
  range: number = 10;
  maturityDate = new Date(new Date().setMonth(new Date().getMonth() + this.range));
  paymentSchedule: number = 0;



  constructor(private formBuilder: FormBuilder) { }  
  
  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      customerId: [{ value: 'CUB13566', disabled: true }],
      loanId: [{ value: 'LUS13566', disabled: true }],
      loanAmount: ['', [Validators.required, Validators.max(10000000), Validators.min(1000)]],
      tradeDate: [this.today.toISOString().substring(0, 10)],
      startDate: [this.today.toISOString().substring(0, 10)],
      maturityDate: [this.maturityDate.toISOString().substring(0, 10)],
      paymentFrequency: ['', [Validators.required]],
      paymentSchedule: [this.paymentSchedule, []],
      paymentTerm: ['', [Validators.required]],
      projectedInterest: ['12.5', []],
       });
      
  }


  setMaturityDate(event) {
    this.model.paymentSchedule=10;
    console.log('model:'+this.model.customerId);
    console.log('range:' + event.target.value);
    this.range = event.target.value;

  }




  calculatepaymentSchedule(event) {
      
    var totalMonths = 12;
    var target = event.target;
    if (target.checked) {
      if (target.value == "Monthly") {
        this.paymentSchedule = totalMonths;
      } else if (target.value == "Quarterly") {
        this.paymentSchedule = totalMonths / 3;
      } else if (target.value == "Half Yearly") {
        this.paymentSchedule = totalMonths / 6;
      } else if (target.value == "Yearly") {
        this.paymentSchedule = totalMonths / 12;
      }
    }
  }

  calculateprojectedInterest(event) {
    console.log(event.target.value);
  }

  onSubmit(form) {
    console.log(form.value)
  }
}
