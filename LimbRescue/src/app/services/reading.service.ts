import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reading } from '../models/reading.model';

const baseUrl = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reading[]> {
    return this.http.get<Reading[]>(baseUrl+'/allreadings');
  }
}
