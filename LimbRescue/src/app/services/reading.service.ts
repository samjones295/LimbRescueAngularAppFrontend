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

  getAllOfPatient(patient_no: string): Observable<Reading[]> {
    return this.http.get<Reading[]>(baseUrl+'/readings?patient_no='+patient_no);
  }

  getById(id: number): Observable<Reading>{
    return this.http.get<Reading>(baseUrl+'/reading/'+id)
  }

  getByString(patient_no: string): Observable<Reading[]>{
    return this.http.get<Reading[]>(baseUrl+'/reading?patient_no='+patient_no)
  }

  put(reading: Reading, id: number){
    const body = {id: id,
                  patient_no: reading.patient_no,
                  date_created: reading.date_created,
                  laterality: reading.laterality,
                  comments: reading.comments}
    return this.http.put(baseUrl+'/reading/'+id, body, {observe: 'response'})
  }

  getDateAndtime(delta: number): Observable<String>{
    return this.http.get<String>(baseUrl+'/start?delta='+delta)
  }
}
