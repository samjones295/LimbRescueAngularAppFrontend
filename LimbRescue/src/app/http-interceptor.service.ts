import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './components/login/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8081',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': `${sessionStorage.getItem('authToken')}`
                }),
                withCredentials: true
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}