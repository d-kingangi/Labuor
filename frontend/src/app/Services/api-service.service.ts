import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { talent, allTalentsResponse, talentInfoResponse } from '../Interfaces/talent.inteface';
import { employer, allEmployersResponse, employerInfoResponse } from '../Interfaces/employer.interface';
import { job, allJobsResponse, jobInfoResponse } from '../Interfaces/job.interface';
import {  industryInfoResponse, allIndustriesResponse } from '../Interfaces/industry.interface';
import { application, applicationInfoResponse, allApplicationsResponse } from '../Interfaces/application.interface';
import { review, allReviewsResponse, reviewInfoResponse } from '../Interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  private apiUrl = 'http://localhost:3000'

  getToken(){
     const token = localStorage.getItem('token') as string
     return token
  }
 

  constructor(private http:HttpClient) { }

  //talents api service

  // createTalent(talent: talent){
  //   return this.http.post<talentInfoResponse>(`${this.apiUrl}/talent`, talent),{
  //     headers: new HttpHeaders({
  //       'content-type': 'application/json'
  //     })
  //   }
  // }

  getAllTalents(){
    return this.http.get<allTalentsResponse>(`${this.apiUrl}/talent`)}

  getSingleTalent(talentId: string){
    return this.http.get<talentInfoResponse>(`${this.apiUrl}/talent/${talentId}`)}

  getTalentsByIndustry(industryId: string){
    return this.http.get<allTalentsResponse>(`${this.apiUrl}/talent/industry/${industryId}`)}

  updateTalent(talentId: string, talent: talent){
    return this.http.put<talentInfoResponse>(`${this.apiUrl}/talent/${talentId}`, talent), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }

  deleteTalent(talentId: string){
    return this.http.delete<talentInfoResponse>(`${this.apiUrl}/talent/${talentId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }

  //employer api service
  
  // createEmployer(employer: employer){
  //   return this.http.post<employerInfoResponse>(`${this.apiUrl}/employer`, employer),{
  //     headers: new HttpHeaders({
  //       'content-type': 'application/json'
  //     })
  //   }
  // }

  getAllEmployers(){
    return this.http.get<allEmployersResponse>(`${this.apiUrl}/employer`)}

  getSingleEmployer(employerId: string){
    return this.http.get<employerInfoResponse>(`${this.apiUrl}/employer/${employerId}`)}

  getEmployersByIndustry(industryId: string){
    return this.http.get<allEmployersResponse>(`${this.apiUrl}/employer/industry/${industryId}`)}

  updateEmployer(employerId: string, employer: employer){
    return this.http.put<employerInfoResponse>(`${this.apiUrl}/employer/${employerId}`, employer), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }

  deleteEmployer(employerId: string){
    return this.http.delete<employerInfoResponse>(`${this.apiUrl}/employer/${employerId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }



  //jobs service
  createJob(job: job){
    return this.http.post<jobInfoResponse>(`${this.apiUrl}/job`, job)
  }

  getEveryJob(){
    return this.http.get<allJobsResponse>(`${this.apiUrl}/job`)
}

  getAllJobsByIndustry(industryId: string){
    return this.http.get<allJobsResponse>(`${this.apiUrl}/job/industry/${industryId}`)
  }

  getJobsByEmployer(orgId: string){
    return this.http.get<allJobsResponse>(`${this.apiUrl}/job/employer/${orgId}`)
  }

  getSingleJob(jobId: string){
    return this.http.get<jobInfoResponse>(`${this.apiUrl}/job/${jobId}`)
  }

  getJobsForTalent(talentId: string){
    return this.http.get<allJobsResponse>(`${this.apiUrl}/job/talent/${talentId}`)
  }

  updateJob(jobId: string, job: job){
    return this.http.put<jobInfoResponse>(`${this.apiUrl}/job/${jobId}`, job), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }

  deleteJob(jobId: string){
    return this.http.delete<jobInfoResponse>(`${this.apiUrl}/job/${jobId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }

  //industries service

  createIndustry(){
    return this.http.post<industryInfoResponse>(`${this.apiUrl}/industry`, null, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    });
  }

  getAllIndustries(){
    return this.http.get<allIndustriesResponse>(`${this.apiUrl}/industry`)
  }

  // application services
  createApplication(application: application){
    return this.http.post<applicationInfoResponse>(`${this.apiUrl}/application`, application)
  }

  getJobApplications(jobId: string){
    return this.http.get<allApplicationsResponse>(`${this.apiUrl}/application/job/${jobId}`)
  }

  getTalentApplications(talentId: string){
    return this.http.get<allApplicationsResponse>(`${this.apiUrl}/application/talent/${talentId}`)
  }

  // updateApplication(applicationId: string){
  //   return this.http.put<applicationInfoResponse>(`${this.apiUrl}/application/${applicationId}`)
  // }

  updateApplication(applicationId: string, statusUpdate: { status: string }) {
    const url = `${this.apiUrl}/application/${applicationId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    const options = { headers: headers };
    return this.http.put<{ message: string }>(url, statusUpdate, options);
  }
  

  deleteApplication(applicationId: string){
    return this.http.delete<applicationInfoResponse>(`${this.apiUrl}/application/${applicationId}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }


  // reviews services
  createReview(review: review){
    return this.http.post<reviewInfoResponse>(`${this.apiUrl}/review`, review)
  }

  getTalentReviews(talentId: string){
    return this.http.get<allReviewsResponse>(`${this.apiUrl}/review/talent/${talentId}`)
  }
}
