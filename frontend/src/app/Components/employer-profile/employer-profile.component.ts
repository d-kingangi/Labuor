import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { employer, employerInfoResponse, allEmployersResponse } from '../../Interfaces/employer.interface';
import { job, allJobsResponse, jobInfoResponse } from '../../Interfaces/job.interface';

@Component({
  selector: 'app-employer-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.css'
})

export class EmployerProfileComponent {

    employers: employer [] =[];
    employer : employer = {} as employer;
    // similarEmployer: employer[] = [];
    jobs: job[] = []
    job : job | null = null;
    // jobInfoResponse = {} as jobInfoResponse;
    jobInfoResponse: jobInfoResponse;
    employerInfoResponse: employerInfoResponse;
    errorMessage: string = '';

    constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute,){
        this.employerInfoResponse = {} as employerInfoResponse;
        this.jobInfoResponse = {} as jobInfoResponse;
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
                    this.fetchEmployersByIndustry(employer.industryId)
                })
            },
            (error) => {
                console.error('Error fetching employer:', error);
            }
        )
    }

    // display jobs by this employer

    displayJobsByEmployer(orgId: string){
      this.apiService.getJobsByEmployer(orgId).subscribe((res)=>{
        if(res.jobs){
          res.jobs.forEach((job)=>{
            this.jobs.push(job);
          })
        }
      })   
    }



    // display similar employers

    fetchEmployersByIndustry(industryId: string) {

        this.apiService.getEmployersByIndustry(industryId).subscribe((res)=>{
          if(res.employers){
            
            res.employers.forEach((employer)=>{
              this.employers.push(employer);
            })
          }
        })
    }


    navigateToSingleEmployer(orgId: string) {
        console.log('Employer ID:', orgId);

        this.apiService.getSingleEmployer(orgId).subscribe(
            (res: employerInfoResponse) => {
                console.log('Response:', res);

                if (res) {
                  this.employerInfoResponse = res;
                  console.log('Employer:', this.employerInfoResponse);
                  this.router.navigate(['/employer-profile', orgId]);
                } else {
                  console.error('Employer not found or an error occurred:', res);
                }
            }, 
            (error) => {
                console.error('Error fetching employer:', error);
            }
        )
    }

    navigateToSingleJob(jobId: string){
        console.log('Job ID:', jobId);
    
        this.apiService.getSingleJob(jobId).subscribe(
          (res: jobInfoResponse) => {
    
            if (res) {
              res.job.forEach((job)=>{this.job = job})
              this.router.navigate(['/job-info', jobId]);
            } else {
              console.error('Job not found or an error occurred:', res);
            }
          },
          (error) => {
            console.error('Error fetching job:', error);
          }
        )
        
      }
}
