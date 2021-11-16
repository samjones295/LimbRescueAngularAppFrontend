import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public username?: string | null;
  public password?: string | null;

  get getLoggedIn(){
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean){
    this.loggedIn.next(value)
  }

  constructor(private http: HttpClient) {

  }

  authenticationService(username: string, password: string) {
    let authToken = this.createBasicAuthToken(username, password)
    return this.http.get(`http://localhost:8080/api/v1/basicauth`,
      { headers: { authorization: authToken } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
        sessionStorage.setItem('authToken', authToken)
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username:string , password:string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    this.loggedIn.next(true)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem('authToken')
    this.username = null;
    this.password = null;
    this.loggedIn.next(false)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}