import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(baseUrl+'/groups');
  }

  get(id: number): Observable<Group>{
    return this.http.get<Group>(baseUrl+'/group/'+id)
  }

  put(group: Group, id: number){
    const body = {name: group.name,
                  reading_ids: group.reading_ids
                }
    this.http.put(baseUrl+'/group/'+id, body, {observe: 'response'}).subscribe()
  }

  post(group: Group){
    const body = {name: group.name,
      reading_ids: group.reading_ids
    }
    this.http.post(baseUrl+'/group', body, {observe: 'response'}).subscribe()
  }
}
