import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './components/login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'LimbRescue';
  isLoggedIn$!: Observable<boolean>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.getLoggedIn;
  }

  handleLogout() {
    this.authenticationService.logout();
  }
}