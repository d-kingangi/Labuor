import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { talent, allTalentsResponse, talentInfoResponse } from '../Interfaces/talent.inteface';
import { employer, allEmployersResponse, employerInfoResponse } from '../Interfaces/employer.interface';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  token = localStorage.getItem('token') as string

  constructor(private http:HttpClient) { }

  //talents api service

  createTalent(talent: talent): Observable<talentInfoResponse>{
    return this.http.post<talentInfoResponse>('http://localhost:3000/talent', talent),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAllTalents(): Observable<allTalentsResponse>{
    return this.http.get<allTalentsResponse>('http://localhost:3000/talent'), {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }
}
