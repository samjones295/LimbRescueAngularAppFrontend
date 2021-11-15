import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reading } from '../models/reading.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reading[]> {
    return this.http.get<Reading[]>(baseUrl+'/readings');
  }

  get(id: number): Observable<Reading>{
    return this.http.get<Reading>(baseUrl+'/reading/'+id)
  }

  put(reading: Reading, id: number){
    const body = {patient_no: reading.patient_no,
                  date_created: reading.date_created,
                  laterality: reading.laterality,
                  comments: reading.comments}
    this.http.put(baseUrl+'/reading/'+id, body, {observe: 'response'}).subscribe()
  }
}
