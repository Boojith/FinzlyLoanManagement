import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Customer } from '../models/customer';
import { LoanService } from '../service/loan.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  
  model:Customer;
  constructor(private loanService:LoanService) { }
  ngOnInit() {
    this.loanService.getCustomerDetails('CUS8345').subscribe(data =>{  
      this.model =data;  
      console.log(data);
      })  
  }

  onSubmit(form) {
    console.log(form.value)
    this.loanService.saveCustomer(form.value).subscribe(data=>{
      
      console.log('Save:'+data);
    });
  }
}
