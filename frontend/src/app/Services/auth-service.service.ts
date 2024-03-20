import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginDetails, loginResponse } from '../Interfaces/login.interface';
import { Observable, of } from 'rxjs';
import { talent, allTalentsResponse, talentInfoResponse } from '../Interfaces/talent.inteface';
import { employer, allEmployersResponse, employerInfoResponse } from '../Interfaces/employer.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  readToken(token:string){
    return this.http.get<{info:talentInfoResponse|employerInfoResponse}>(`${this.apiUrl}/auth/checkdetails`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': token
      })
    })
  }

  loginUser(details: loginDetails): Observable<loginResponse>{
    return this.http.post<loginResponse>(`${this.apiUrl}/auth/login`, details)
  }

    //checkuser details
  checkUserDetails(token: string){
    return this.http.get<talentInfoResponse|employerInfoResponse>(`${this.apiUrl}/auth/checkdetails`, {
       headers: {
        token
      }
    })
  }


  registerTalent(talent: talent){
    return this.http.post<talentInfoResponse>(`${this.apiUrl}/talent`, talent)
  }

  registerEmployer(employer: employer){
    return this.http.post<employerInfoResponse>(`${this.apiUrl}/employer`, employer)
  }
}
