import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { talent, allTalentsResponse, talentInfoResponse } from '../Interfaces/talent.inteface';
import { employer, allEmployersResponse, employerInfoResponse } from '../Interfaces/employer.interface';
import { job, allJobsResponse, jobInfoResponse } from '../Interfaces/job.interface';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'http://localhost:3500'

  token = localStorage.getItem('token') as string

  constructor(private http:HttpClient) { }

  //talents api service

  createTalent(talent: talent){
    return this.http.post<talentInfoResponse>(`${this.apiUrl}/talent`, talent),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAllTalents(){
    return this.http.get<allTalentsResponse>(`${this.apiUrl}/talent`), {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getSingleTalent(talentId: string){
    return this.http.get<talentInfoResponse>(`${this.apiUrl}/talent/${talentId}`),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getTalentsByIndustry(industryId: string){
    return this.http.get<allTalentsResponse>(`${this.apiUrl}/talent/industry/${industryId}`),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  updateTalent(talentId: string, talent: talent){
    return this.http.put<talentInfoResponse>(`${this.apiUrl}/talent/${talentId}`, talent), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }

  deleteTalent(talentId: string){
    return this.http.delete<talentInfoResponse>(`${this.apiUrl}/talent/${talentId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }

  //employer api service
  createEmployer(employer: employer){
    return this.http.post<employerInfoResponse>(`${this.apiUrl}/employer`, employer),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAllEmployers(){
    return this.http.get<allEmployersResponse>(`${this.apiUrl}/employer`), {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getSingleEmployer(employerId: string){
    return this.http.get<employerInfoResponse>(`${this.apiUrl}/employer/${employerId}`),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getEmployersByIndustry(industryId: string){
    return this.http.get<allEmployersResponse>(`${this.apiUrl}/employer/${industryId}`),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  updateEmployer(employerId: string, employer: employer){
    return this.http.put<employerInfoResponse>(`${this.apiUrl}/employer/${employerId}`, employer), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }

  deleteEmployer(employerId: string){
    return this.http.delete<employerInfoResponse>(`${this.apiUrl}/employer/${employerId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }

  //checkuser details
  checkUserDetails(token: string){
    return this.http.get<talentInfoResponse|employerInfoResponse>(`${this.apiUrl}/auth/checkdetails`, {
      headers: {
        token
      }
    })
  }

  //jobs service
  createJob(job: job){
    return this.http.post<jobInfoResponse>(`${this.apiUrl}/job`, job),{
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }

  getAllJobs(){
    return this.http.get<allJobsResponse>(`${this.apiUrl}/job`), {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getJobsByIndustry(industryId: string){
    return this.http.get<allJobsResponse>(`${this.apiUrl}/job/${industryId}`),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getSingleJob(jobId: string){
    return this.http.get<jobInfoResponse>(`${this.apiUrl}/job/${jobId}`),{
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  updateJob(jobId: string, job: job){
    return this.http.put<jobInfoResponse>(`${this.apiUrl}/job/${jobId}`, job), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }

  deleteJob(jobId: string){
    return this.http.delete<jobInfoResponse>(`${this.apiUrl}/job/${jobId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }
}
