import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { talent, allTalentsResponse, talentInfoResponse } from '../../Interfaces/talent.inteface';
import { job, jobInfoResponse, allJobsResponse } from '../../Interfaces/job.interface';
import { employer, allEmployersResponse, employerInfoResponse } from '../../Interfaces/employer.interface';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NgbAccordionModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {

  talents: talent[] = [];
  talentInfoResponse: talentInfoResponse;
  jobs: job[] = []
  employers: employer []= []
  employerInfoResponse: employerInfoResponse;
  jobInfoResponse: jobInfoResponse;

    /**
   * Constructor for initializing ApiServiceService and Router.
   *
   * @param {ApiServiceService} apiservice - the ApiServiceService instance
   * @param {Router} router - the Router instance
   */

  constructor(private apiservice: ApiServiceService, private router: Router) {
    this.displayTalents();
    this.displayJobs();
    this.displayEmployers()
    this.talentInfoResponse = {} as talentInfoResponse;
    this.employerInfoResponse = {} as employerInfoResponse;
    this.jobInfoResponse = {} as jobInfoResponse;
  }

    /**
   * Display talents from the API response.
   */

  displayTalents(){
    this.apiservice.getAllTalents().subscribe((res)=>{
      if(res.talents){
        res.talents.forEach((talent)=>{
          this.talents.push(talent);
        })
      }
    })
  }


    /**
   * Display jobs fetched from the API response.
   *
   */

  displayJobs(){
    this.apiservice.getEveryJob().subscribe((res)=>{
      if(res.jobs){
        // console.log(res.jobs);
        
        res.jobs.forEach((job)=>{
          this.jobs.push(job);
        })
      }
    })
  }


    /**
   * Function to display the list of employers.
   */
  displayEmployers(){
    this.apiservice.getAllEmployers().subscribe((res)=>{
      if(res.employers){
        res.employers.forEach((employer)=>{
          this.employers.push(employer);
        })
      }
    })
  }


   /**
   * Navigates to a single talent based on the provided talent ID.
   *
   * @param {string} talentId - the ID of the talent to navigate to
   * @return {void} 
   */
  // navigateToSingleTalent(talentId: string) {
  //   console.log('Talent ID:', talentId);

  //   this.apiservice.getSingleTalent(talentId).subscribe(
  //       (res: talentInfoResponse) => {
  //           console.log('Response:', res);

  //           if (res) {
  //               this.talentInfoResponse = res;
  //               console.log('Talent:', this.talentInfoResponse);  
  //               this.router.navigate(['/talent-profile', talentId]);
  //           } else {
  //             console.error('Talent not found or an error occurred:', res);
  //           }
  //       },
  //       (error) => {
  //           console.error('Error fetching talent:', error);
  //       }
  //   );
  // }


  /**
   * A function that navigates to a single employer based on the provided employer ID.
   *
   * @param {string} employerId - The ID of the employer to navigate to
   */
  navigateToSingleEmployer(employerId: string){
    console.log('EmployerId:', employerId);

    this.apiservice.getSingleEmployer(employerId).subscribe(
      (res: employerInfoResponse) => {
        console.log('Response:', res);

        if(res){
          this.employerInfoResponse = res;
          console.log('Employer Info:', this.employerInfoResponse);
          this.router.navigate(['/employer-profile', employerId])
        } else {
          console.error('Employernot found or an error occurred:', res);
        }      
      }, 
      (error) =>{
        console.error('Error fetching employer:', error);
      }
    )
  }


   /**
   * Navigates to a single job with the given jobId.
   *
   * @param {string} jobId - The ID of the job to navigate to.
   */
  navigateToSingleJob(jobId: string){
    console.log('Job ID:', jobId);

    this.apiservice.getSingleJob(jobId).subscribe(
      (res: jobInfoResponse) => {
        console.log('Response:', res);

        if (res) {
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
