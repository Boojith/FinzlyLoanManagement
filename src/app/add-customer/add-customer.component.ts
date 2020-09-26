import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from './MustMatch';
import { LoanService } from '../service/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(private loanService: LoanService,private formBuilder: FormBuilder,private router:Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            fathersName: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            nominee: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
          validator: MustMatch('password', 'confirmPassword')
      });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        this.loanService.saveCustomer(this.registerForm.value).subscribe();
        this.router.navigate(['login']);
       
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}
