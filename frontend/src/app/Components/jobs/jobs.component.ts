import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { job, allJobsResponse, jobInfoResponse } from '../../Interfaces/job.interface';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [ NavbarComponent, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})

export class JobsComponent {

  jobs: job [] = [];
  jobInfoResponse: jobInfoResponse;
  jobsByIndustry: { industryId: string; jobs: job[] }[] = [];
  isLoading = false;
  error = '';

  constructor(private apiService: ApiServiceService, private router: Router){
    this.jobInfoResponse = {} as jobInfoResponse;
    this.displayAllJobs();
  }

  displayAllJobs(): void {
    this.isLoading = true;
    this.error = '';
    this.jobsByIndustry = [];

    this.apiService.getEveryJob().subscribe(
      (res: { jobs: job[] }) => {
        
        if (res && Array.isArray(res.jobs)) {
          res.jobs.forEach((job: job) => {
            const industryIndex = this.jobsByIndustry.findIndex(
              (industry) => industry.industryId === job.industryId
            )

            if (industryIndex !== -1) {
              this.jobsByIndustry[industryIndex].jobs.push(job)
            } else {
              this.jobsByIndustry.push({
                industryId: job.industryId,
                jobs: [job]
              })
            }
          })
        } else {
          console.error('Unexpected response structure:', res)
          this.error = 'Unexpected response structure. Please try again later.'
        }
        this.isLoading = false
      },
      (error) => {
        console.error('Error fetching jobs:', error)
        this.error = 'Failed to fetch jobs. Please try again later.'
        this.isLoading = false
      }
    )
  }

  navigateToSingleJob(jobId: string){
    console.log('Job ID:', jobId);

    this.apiService.getSingleJob(jobId).subscribe(
      (res: jobInfoResponse) => {
        console.log('Response:', res);

        if (res) {
          this.jobInfoResponse = res;
          console.log('Job details:', this.jobInfoResponse);
          this.router.navigate(['/job', jobId]);
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


  
