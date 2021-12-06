import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  username?: string;
  password?: string;
  errorMessage = 'Invalid Credentials';
  successMessage?: string;
  invalidLogin = false;
  loginSuccess = false;
  login_subscription: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.login_subscription != undefined){
      this.login_subscription.unsubscribe()
    }
  }

  handleLogin() {
    this.login_subscription = this.authenticationService.authenticationService(this.username!, this.password!).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/home']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }
}