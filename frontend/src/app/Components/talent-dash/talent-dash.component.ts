import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ApiServiceService } from '../../Services/api-service.service';
import { talent, talentInfoResponse, allTalentsResponse } from '../../Interfaces/talent.inteface';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import {  allApplicationsResponse, application, applicationInfoResponse} from '../../Interfaces/application.interface'
import { job, allJobsResponse, jobInfoResponse } from '../../Interfaces/job.interface';

@Component({
  selector: 'app-talent-dash',
  standalone: true,
  imports: [ NavbarComponent, CommonModule],
  templateUrl: './talent-dash.component.html',
  styleUrl: './talent-dash.component.css'
})

export class TalentDashComponent {

  talents: talent [] = [];
  talent : talent={} as talent
  jobs: job []=[]
  job: job={} as job
  // applications: application [] =[]
  // application: application={} as application
  application: any | null = null
  applications: any [] = []
  talentInfoResponse: talentInfoResponse;
  jobInfoResponse: jobInfoResponse;
  applicationInfoResponse: applicationInfoResponse 
  errorMessage: string = '';

  constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute){
    this.talentInfoResponse = {} as talentInfoResponse;
    this.applicationInfoResponse= {} as applicationInfoResponse
    this.jobInfoResponse= {} as jobInfoResponse
  }

  ngOnInit(){
    const talentId = this.route.snapshot.paramMap.get('talentId');
      if (talentId) {
        this.getSingleTalent(talentId);
        this.getTalentJobs(talentId)
        this.getTalentApplications(talentId)
      } else {
        console.error('Talent ID not provided');
      }
  }

  getSingleTalent(id: string) {
    this.apiService.getSingleTalent(id).subscribe(
        (res: talentInfoResponse) => {
            res.talent.forEach((talent) =>{
              this.talent = talent
            });
            
        },
        (error) => {
            console.error('Error fetching talent:', error);
        }
    );
  }

  getTalentJobs(talentId: string){
    console.log('talentid:', talentId);
    
    this.apiService.getJobsForTalent(talentId).subscribe((res)=>{
      if(res.jobs){
        
        res.jobs.forEach((job)=>{
          this.jobs.push(job)
        })
      }
    })
  }

  getTalentApplications(talentId: string){
    this.apiService.getTalentApplications(talentId).subscribe((res)=>{
      if(res.applications){
        // console.log('Talent Application', this.applications);

        res.applications.forEach((application)=>{
          this.applications.push(application)
        })   
      }
    })
  }
}
