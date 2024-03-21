import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { employer, employerInfoResponse, allEmployersResponse } from '../../Interfaces/employer.interface';
import { job, allJobsResponse, jobInfoResponse } from '../../Interfaces/job.interface';
import {  allApplicationsResponse, application, applicationInfoResponse} from '../../Interfaces/application.interface'

@Component({
  selector: 'app-employer-dash',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './employer-dash.component.html',
  styleUrl: './employer-dash.component.css'
})


export class EmployerDashComponent {
    employers: employer [] =[];
    employer : employer = {} as employer;
    jobs: job[] = []
    job : job | null = null;
    applications: any [] = []
    application: any | null = null
    employerInfoResponse: employerInfoResponse;
    jobInfoResponse: jobInfoResponse;
    applicationInfoResponse: applicationInfoResponse
    errorMessage: string = '';

    constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute,){
      this.employerInfoResponse = {} as employerInfoResponse;
      this.jobInfoResponse = {} as jobInfoResponse;
      this.applicationInfoResponse = {} as applicationInfoResponse
    }

    ngOnInit(){
      const employerId = this.route.snapshot.paramMap.get('employerId');
        if (employerId) {
            this.getSingleEmployer(employerId);
        } else {
            console.error('Employer ID not provided');
        }
    }

    getSingleEmployer(id: string) {
      
      this.apiService.getSingleEmployer(id).subscribe(
          (res: employerInfoResponse) => {
              
              res.employer.forEach((employer) => {
                  this.employer = employer;
                  this.displayJobsByEmployer(employer.orgId);
              })
          },
          (error) => {
              console.error('Error fetching employer:', error);
          }
      )
    }

    displayJobsByEmployer(orgId: string){
      this.apiService.getJobsByEmployer(orgId).subscribe((res)=>{
        if(res.jobs){
          res.jobs.forEach((job)=>{
            this.jobs.push(job);
          })
        }
      })   
    }

    getJobApplications(jobId: string){
      this.apiService.getJobApplications(jobId).subscribe((res)=>{
        if(res.applications){
          console.log('Applications', this.applications);
          
          res.applications.forEach((application)=>{
            this.applications.push(application);
          })
        }
      })
    }

    navigateToPostJob() {
      this.router.navigate(['/post-job']);
    }

    // acceptJobApplication(applicationId: string) {
    //   const statusUpdate: { status: string } = { status: 'Accepted' };
    
    //   this.apiService.updateApplication(applicationId, statusUpdate).subscribe(
    //     (res: { message: string }) => {
    //       console.log(res.message);
    //       this.getJobApplications(this.job?.jobId as string); 
    //     },
    //     (error) => {
    //       console.error('Error updating application:', error);
    //     }
    //   );
    // }
    

    rejectJobApplication(applicationId: string){}
}
