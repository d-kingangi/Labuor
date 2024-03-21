import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../Services/api-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { RouterLink, Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { job, allJobsResponse, jobInfoResponse } from '../../Interfaces/job.interface';
import { application } from '../../Interfaces/application.interface';
import { talent, talentInfoResponse, allTalentsResponse } from '../../Interfaces/talent.inteface';
import { employer, allEmployersResponse, employerInfoResponse } from '../../Interfaces/employer.interface';

@Component({
  selector: 'app-job-info',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './job-info.component.html',
  styleUrl: './job-info.component.css'
})

export class JobInfoComponent {

  jobs: job [] = [];
  job: job = {} as job;
  similarJobs: job[] = [];
  jobInfoResponse: jobInfoResponse;
  talentInfoResponse: talentInfoResponse
  employerInfoResponse: employerInfoResponse
  errorMessage: string = '';

  constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute, private authService: AuthServiceService) {
    this.jobInfoResponse = {} as jobInfoResponse;
    this.talentInfoResponse= {} as talentInfoResponse;
    this.employerInfoResponse= {} as employerInfoResponse
  }

  ngOnInit(){
    const jobId = this.route.snapshot.paramMap.get('jobId');
    if (jobId) {
      this.getSingleJob(jobId);
    } else {
      console.error('Job ID not provided');
    }
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
        console.log('Job Info Response:', res);
        
        res.job.forEach((job)=>{
          this.job = job
          this.fetchJobsByIndustry(job.industryId);
        })
      },
      (error) => {
        console.error('Error fetching job:', error);
      }
    )
  }


  createApplication(jobId: string, orgId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
    console.error('Token not found');
    return;
   }

    this.authService.readToken(token).subscribe(
      (res) => {
        let talentId: string
        // console.log(res.info);
        
        if ('talentId' in res.info) {
          talentId = res.info.talentId as string;
          console.log('Talent Id', talentId);
        } else if ('orgId' in res.info) {
            talentId = (res.info as employerInfoResponse).employer[0].orgId;
        } else {
            console.error('ID not found in response:', res.info);
            return;
        }

        const application: application = {
          jobId: jobId,
          orgId: orgId,
          talentId: talentId
        };
  
        this.apiService.createApplication(application).subscribe(
          (response) => {
            console.log('Application created successfully:', response);
          },
          (error) => {
            console.error('Error creating application:', error);
          }
        );
      },
      (error) => {
        console.error('Error retrieving user details:', error);
      }
    );
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

        if (res && Array.isArray(res.jobs)) {
          this.similarJobs = res.jobs.slice(0, 6);
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
    // console.log('Job ID:', jobId);

    this.apiService.getSingleJob(jobId).subscribe(
      (res: jobInfoResponse) => {

        if(res){
          this.jobInfoResponse = res;
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
