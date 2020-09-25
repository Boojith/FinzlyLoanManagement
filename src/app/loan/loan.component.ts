import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../service/loan.service';
import { Router } from '@angular/router';
import { Loan } from '../models/loan';
import { DatePipe } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loanForm: FormGroup;
  customerId:string;
  loan: Loan = new Loan();
  submitted = false;
  today = new Date();
  range: number;
  date: Date;
  paymentSchedule: number = 0;

  constructor(private formBuilder: FormBuilder, private loanService: LoanService, private router: Router,private authService:AuthService) { }
  ngOnInit() {
    this.customerId=this.authService.getCustomerId();
    this.loanForm = this.formBuilder.group({
      customerId: [{ value:this.customerId, disabled: true }],
      loanAmount: ['', [Validators.required, Validators.max(10000000), Validators.min(1000)]],
      tradeDate: [Validators.required],
      startDate: [Validators.required],
      loanDuration: [''],
      maturityDate: [{ value: new Date(), disabled: true }],
      interestRate: [{ value: 10, disabled: true }],
      paymentFrequency: ['', [Validators.required]],
      paymentSchedule: [0, []],
      paymentTerm: ['', [Validators.required]],
      projectedInterest: [0, []],
    });
  }

  get f() { return this.loanForm.controls; }


  setMaturityDate(event) {
    var range = (event.target.value) * 12;
    var startDate = this.loanForm.get('startDate').value;
    var date = new Date(startDate);
    if (range != 0) {
      this.loanForm.patchValue({
        maturityDate: new Date(date.setMonth(date.getMonth() + range)).toISOString().substring(0, 10)
      });
    }

  }




  calculatepaymentSchedule(event) {
    var totalMonths = parseInt(this.loanForm.get('loanDuration').value) * 12;
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
      this.loanForm.patchValue({
        paymentSchedule: this.paymentSchedule
      });
    }
  }

  calculateprojectedInterest(event) {
    console.log(event.target.value);
    var value = event.target.value;
    var principal = this.loanForm.get('loanAmount').value;
    var totalYears = this.loanForm.get('loanDuration').value;
    var interestRate = this.loanForm.get('interestRate').value;
    var paymentSchedule = this.loanForm.get('paymentSchedule').value;

    if (value != undefined) {
      var interestAmount = 0;
      for (var i = 1; i <= paymentSchedule; i++) {
        interestAmount = interestAmount + (principal * (totalYears / paymentSchedule) * interestRate) / 100;
        principal = principal - (principal / paymentSchedule);
      }
    }

    this.loanForm.patchValue({
      projectedInterest: interestAmount
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.loanForm.invalid) {
      return;
    }
    this.loan.customerId = this.loanForm.get('customerId').value;
    this.loan.loanAmount = this.loanForm.get('loanAmount').value;
    this.loan.tradeDate = this.formatDate(this.loanForm.get('tradeDate').value);
    this.loan.startDate = this.formatDate(this.loanForm.get('startDate').value);
    this.loan.loanDuration = this.loanForm.get('loanDuration').value;
    this.loan.maturityDate = this.formatDate(this.loanForm.get('maturityDate').value);
    this.loan.interestRate = this.loanForm.get('interestRate').value;
    this.loan.paymentFrequency = this.loanForm.get('paymentFrequency').value;
    this.loan.paymentSchedule = this.loanForm.get('paymentSchedule').value;
    this.loan.paymentTerm = this.loanForm.get('paymentTerm').value;
    this.loan.projectedInterest = this.loanForm.get('projectedInterest').value;
    
    console.log(this.loan);


    this.loanService.saveLoan(this.loan).subscribe(data => {
      console.log('Save Loan:' + data);
    });
    this.router.navigate(['home']);
  }

   formatDate(input:string) {
    var datePart = input.match(/\d+/g),
    year = datePart[0],
    month = datePart[1], 
    day = datePart[2];
  
    return day+'-'+month+'-'+year;
  }


}
