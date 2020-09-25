import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Customer } from '../models/customer';
import { LoanService } from '../service/loan.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  model: Customer;
  customerForm: FormGroup;
  customerId:string;
  constructor(private loanService: LoanService, private formBuilder: FormBuilder,private authService:AuthService) {
    this.customerId=this.authService.getCustomerId();
    this.loanService.getCustomerDetails(this.customerId).subscribe(data => {
      this.model = data;
      this.customerForm = this.formBuilder.group({
        customerId: [this.model.customerId,],
        name: [this.model.name],
        fathersName: [this.model.fathersName],
        address: [this.model.address],
        nominee: [this.model.nominee],
        phone: [this.model.phone],
        email: [this.model.email]
      });
    });
  }
  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      customerId: [], name: [], fathersName: [], address: [], nominee: [], phone: [], email: []
    });
    this.customerForm.disable();
  }
  
}
