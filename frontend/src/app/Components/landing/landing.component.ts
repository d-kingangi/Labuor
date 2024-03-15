import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { talent, allTalentsResponse, talentInfoResponse } from '../../Interfaces/talent.inteface';
import { job, jobInfoResponse, allJobsResponse } from '../../Interfaces/job.interface';
import { employer, allEmployersResponse, employerInfoResponse } from '../../Interfaces/employer.interface';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NgbAccordionModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {

  talents: talent[] = [];
  jobs: job[] = []
  employers: employer []= []

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

}
