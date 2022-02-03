import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from 'src/app/global/Constants';

const baseUrl = Constants.IP;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Create variables for login authentication
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public username?: string | null;
  public password?: string | null;

  // Getter method to return the logged in variable as an observable
  get getLoggedIn(){
    return this.loggedIn.asObservable();
  }

  // Set method to set the logged in variable
  setLoggedIn(value: boolean){
    this.loggedIn.next(value)
  }

  constructor(private http: HttpClient) {}

  // Method used to call authentication on the backend
  authenticationService(username: string, password: string) {
    // Create an authentication token using the username  and password
    let authToken = this.createBasicAuthToken(username, password)
    
    return this.http.get(`${baseUrl}/api/v1/basicauth`,
      { headers: { authorization: authToken } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
        sessionStorage.setItem('authToken', authToken)
      }));
  }

  // Create a Basic auth token for header
  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  // Set a session storage item to keep the username for persistance
  registerSuccessfulLogin(username:string , password:string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    this.loggedIn.next(true)
  }

  // Called on clicking the login button
  logout() {
    // Reset variables and set the session storage items
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem('authToken')
    this.username = null;
    this.password = null;
    this.loggedIn.next(false)
  }

  // Used to check if a user is logged in
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    // See if it is in session storage
    if (user === null) return false
    return true
  }

  // Used to get the logged in username 
  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    // return the username
    if (user === null) return ''
    return user
  }
}