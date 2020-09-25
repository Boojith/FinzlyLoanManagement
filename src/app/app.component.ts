import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinzlyLoanManagement';

  constructor (private authService:AuthService, 
    private router:Router) {
}

logout() {
  console.log('logout');
this.authService.logoutUser();
this.router.navigate(['login']);
}

signUp(){
  this.router.navigate(['add-customer']);
}

}
