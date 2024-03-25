import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { talent, talentInfoResponse } from '../../Interfaces/talent.inteface';
import { job, jobInfoResponse } from '../../Interfaces/job.interface';
import { employer,  employerInfoResponse } from '../../Interfaces/employer.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FaqItem }  from '../../Interfaces/faq.interface';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NgbAccordionModule, NavbarComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {

  talents: talent[] = [];
  talentInfoResponse = {} as talentInfoResponse;
  jobs: job[] = []
  job : job | null = null;
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
  navigateToSingleTalent(talentId: string) {
    console.log('Talent ID:', talentId);

    this.apiservice.getSingleTalent(talentId).subscribe(
        (res: talentInfoResponse) => {

            if (res) {
                this.talentInfoResponse = res;  
                this.router.navigate(['/talent-profile', talentId]);
            } else {
              console.error('Talent not found or an error occurred:', res);
            }
        },
        (error) => {
            console.error('Error fetching talent:', error);
        }
    );
  }


  /**
   * A function that navigates to a single employer based on the provided employer ID.
   *
   * @param {string} employerId - The ID of the employer to navigate to
   */

  
  navigateToSingleEmployer(employerId: string){
    console.log('EmployerId:', employerId);

    this.apiservice.getSingleEmployer(employerId).subscribe(
      (res: employerInfoResponse) => {

        if(res){
          this.employerInfoResponse = res;
          this.router.navigate(['/employer-profile', employerId])
        } else {
          console.error('Employer not found or an error occurred:', res);
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



  // FAQ items here

  toggleExpansion(faq: FaqItem): void {
    faq.expanded = !faq.expanded;
  }

  faqs: FaqItem[] = [
    { 
      question: "What are the benefits of freelancing?", 
      answer: "Because Labour is borderless and global, anyone can apply for a job and get paid, no matter where our Freelancers and Customers are in the world, and regardless of whether they have access to banking services. .", 
      expanded: true
    },
    { 
      question: "How can I earn on Labour?", 
      answer: "Labour currently supports two major blockchains; Ethereum and BNB Chain. Freelancers and Customers can organise job payments in ETH, WBTC, TIME, and stablecoins", 
      expanded: false 
    },
    {
      question: "How does a Labour Premium membership benefit Freelancers?",
      answer: "Freelancers are charged 10% in platform fees for each Job or Gig they complete. ",
      expanded: false
    },
    {
      question: "How does a Labour Premium membership benefit Employers?",
      answer: "Customers receive a bonus in Labour tokens every time they make a payment to a Freelancer. This acts as an incentive for Customers to continue using Labour for all their hiring needs.",
      expanded: false
    }, 
    {
      question: "Can I apply for jobs without a Premium membership?",
      answer: "Absolutely! Labour’s cryptocurrency job market is open to all. ",
      expanded: false
    },
    {
      question: "What is ‘Job Mining’?",
      answer: "Whenever a task is completed and a job payment is made, Labour converts its fee into LABOUR, the native token of the wider labour.tech ecosystem. ",
      expanded: false
    }

    
  ];

}
