import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../service/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loanForm: FormGroup;
  submitted = false;
  today = new Date();
  range: number;
  date: Date;
  paymentSchedule: number = 0;

  constructor(private formBuilder: FormBuilder, private loanService: LoanService) { }
  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      customerId: [{ value: 'CUB13566', disabled: true }],
      // loanId: [{ value: 'LUS13566', disabled: true }],
      loanAmount: ['', [Validators.required, Validators.max(10000000), Validators.min(1000)]],
      tradeDate: [this.today],
      startDate: [this.today],
      loanDuration: [''],
      maturityDate: [{ value: new Date(), disabled: true }],
      interestRate: [{ value: 10, disabled: true }],
      paymentFrequency: ['', [Validators.required]],
      paymentSchedule: [0, []],
      paymentTerm: ['', [Validators.required]],
      projectedInterest: [0, []],
    });
    this.loanForm.get('customerId').setValue('CUB13566');
    
  

  }

  // convenience getter for easy access to form fields
  get f() { return this.loanForm.controls; }


  setMaturityDate(event) {
    var range = event.target.value;
    var startDate = this.loanForm.get('startDate').value;
    // var start=new Date(startDate[0], startDate[1] - 1, startDate[2])
    // console.log("Start Date:"+startDate);
    // console.log("Maturity Date:"+new Date(start.setMonth(new Date().getMonth() +  parseInt(range))));   
    if (range != 0) {
      this.loanForm.patchValue({
        maturityDate: new Date(new Date().setMonth(new Date().getMonth() + parseInt(range))).toISOString().substring(0, 10)
      });
    }

  }




  calculatepaymentSchedule(event) {
    var totalMonths = this.loanForm.get('loanDuration').value;
    console.log(totalMonths);
    var target = event.target;
    if (target.checked) {
      if (target.value == "Monthly") {
        this.paymentSchedule = totalMonths;
        console.log(this.paymentSchedule);
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
    var totalMonths = this.loanForm.get('loanDuration').value;
    var interestRate = this.loanForm.get('interestRate').value;
    var paymentSchedule = this.loanForm.get('paymentSchedule').value;

    if (value == 'Interest Only') {
      var interestAmount = (principal * (totalMonths/12) * interestRate) / 100 ;
    } else if (value == 'Even Principal') {
      var i;
      var interestAmount = 0;
      for (i = 1; i <= paymentSchedule; i++) {
        interestAmount= interestAmount+(principal * ((totalMonths/paymentSchedule)/12) * interestRate) / 100;
        console.log('Interest'+i+'='+interestAmount);
        principal=principal-(principal/paymentSchedule);

      }
    }

    this.loanForm.patchValue({
      projectedInterest: interestAmount
    });

  }

  onSubmit() {
    this.submitted = true;
    console.log("Form value:"+this.loanForm.value);
    console.log("Form Raw value:"+this.loanForm.getRawValue());
    if (this.loanForm.invalid) {    
      console.log('Form is invalid');
      return;
    }
    this.loanService.saveLoan(this.loanForm.value).subscribe(data => {
      console.log('Save Loan:' + data);
    });
    this.loanForm.reset();
  }
}
