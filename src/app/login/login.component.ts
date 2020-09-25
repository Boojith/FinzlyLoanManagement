import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
 
@Component({
   templateUrl: './login.component.html',
   styles: [``]
})
export class LoginComponent implements OnInit { 
 
    invalidCredentialMsg: string;
    username:string;
    password:string;
    retUrl:string="home";
 
    constructor(private authService: AuthService, 
                private router: Router, 
                private activatedRoute:ActivatedRoute) {
    }
 
    ngOnInit() {
        this.activatedRoute.queryParamMap
                .subscribe(params => {
            this.retUrl = params.get('retUrl'); 
            console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
        });
    }
 
    onFormSubmit(loginForm) {
       this.authService.login(loginForm.value.username, loginForm.value.password).subscribe(data => {
           console.log( 'return to '+ this.retUrl);
           if (this.retUrl!=null) {
                this.router.navigate( [this.retUrl]);
           } else if(this.retUrl==null|| data==false){
                this.router.navigate( ['home']);
           }
       });
    }
} 