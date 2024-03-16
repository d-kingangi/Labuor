import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../Services/api-service.service';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { job, allJobsResponse, jobInfoResponse } from '../../Interfaces/job.interface';

@Component({
  selector: 'app-job-info',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './job-info.component.html',
  styleUrl: './job-info.component.css'
})

export class JobInfoComponent {

  similarJobs: job[] = [];
  jobInfoResponse: jobInfoResponse;
  errorMessage: string = '';

  constructor(private apiService: ApiServiceService, private router: Router) {
    this.jobInfoResponse = {} as jobInfoResponse;
  }


    /**
   * Retrieves a single job by its ID from the API service and logs the response. 
   *
   * @param {string} id - the ID of the job to retrieve
   * @return {void} 
   */
  getSingleJob(id: string) {
    this.apiService.getSingleJob(id).subscribe(
      (res: jobInfoResponse) => {
        console.log(res);

        if (res) {
          console.log('Job details:', res);
        } else {
          console.error('Job not found or an error occurred:', res);
        }
      },
      (error) => {
        console.error('Error fetching job:', error);
      }
    )
  }

    /**
   * Fetches jobs by industry.
   *
   * @param {string} industryId - The ID of the industry to fetch jobs for
   * @return {void} 
   */

  fetchJobsByIndustry(industryId: string) {
    console.log('Fetching jobs by industry:', industryId);
    this.apiService.getAllJobsByIndustry(industryId).subscribe(
      (res: allJobsResponse) => {
        console.log('Response:', res);

        if (res && Array.isArray(res.jobs)) {
          this.similarJobs = res.jobs.slice(0, 6);
          console.log('Similar Jobs:', this.similarJobs);
        } else {
          this.errorMessage = 'Unexpected response structure.';
          console.error('Unexpected response structure:', res);
        }     
      },
      (error) => {
        this.errorMessage = 'Error fetching similar jobs. Please try again.';
        console.error('Error fetching similar jobs:', error);
      }
    )
  }

    /**
   * Navigate to a single job by its ID, fetch the job details, and handle the response and errors.
   *
   * @param {string} jobId - The ID of the job to navigate to.
   */

  navigateToSingleJob(jobId: string) {
    console.log('Job ID:', jobId);

    this.apiService.getSingleJob(jobId).subscribe(
      (res: jobInfoResponse) => {
        console.log('Response:', res);

        if(res){
          this.jobInfoResponse = res;
          console.log('Job details:', this.jobInfoResponse);
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
