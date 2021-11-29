import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Result[]> {
    return this.http.get<Result[]>(baseUrl+'/results');
  }

}
