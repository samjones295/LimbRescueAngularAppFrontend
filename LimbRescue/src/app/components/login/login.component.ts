import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  // initialize variables used for login
  username?: string;
  password?: string;
  errorMessage = 'Invalid Credentials';
  successMessage?: string;
  invalidLogin = false;
  loginSuccess = false;
  login_subscription: any;

  constructor(private router: Router, private authenticationService: AuthenticationService) {   }

  // Called when page is loaded, dont need to do anything here
  ngOnInit() {}

  // Called  when the page  is left
  ngOnDestroy(){
    // Unsubscribe from subscription to prevent resource leaks
    if(this.login_subscription != undefined){
      this.login_subscription.unsubscribe()
    }
  }

  // Called when the login button is pressed
  handleLogin() {
    // Try to do the login
    this.login_subscription = this.authenticationService.authenticationService(this.username!, this.password!).subscribe((result)=> {
      // If successful set thevariables
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';

      // And navigate to the home page
      this.router.navigate(['/home']);
    }, () => {
      // Otherwise keep it as invalid login
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }
}