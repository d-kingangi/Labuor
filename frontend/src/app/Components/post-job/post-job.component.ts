import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { job, jobInfoResponse } from '../../Interfaces/job.interface';
import { ApiServiceService } from '../../Services/api-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { industry, industryInfoResponse, allIndustriesResponse } from '../../Interfaces/industry.interface';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})

export class PostJobComponent {
  postJobForm!: FormGroup
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false
  // jobs: job[] =[]
  industries : industry[] = [];

  constructor(private authservice: AuthServiceService, private fb:FormBuilder, private apiservice: ApiServiceService, private router: Router){
    this.postJobForm = this.fb.group({
      jobname: ['', [Validators.required]],
      description: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      salary: ['', [Validators.required]]
    })
    this.getIndustries()
  }


  getIndustries(){
    this.apiservice.getAllIndustries().subscribe(res =>{
      if(res.industries){
        res.industries.forEach((industry) => {
          this.industries.push(industry);
        })
      }
    },
    (error) => {
      console.log('Error fetching industries:', error);
    }
    )
  }

  displaySuccess(msg:string){
    this.successMsg = msg;
    this.successDiv = true
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate(['/login'])
    }, 2000);
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token){
      return token
    } else {
      return 'null'
    }
  }

  onSubmit() {
    if (this.postJobForm.valid) {
      this.createJob(this.postJobForm.value);
    }
  }

  createJob(details: job){
    const token = this.getToken();
    if(!token){
      console.error('Token not found')
      return
    }

    this.authservice.readToken(token).subscribe(
      (res)=>{
        let orgId: string
        console.log(res.info);

        if('orgId' in res.info){
          orgId = res.info.orgId as string
          console.log('Org Id', orgId); 
        }else {
          console.error('ID not found in response:', res.info);
          return
        }
      },(error) => {
        console.error('Error reading token:', error);
      }
    )
  }

  createJobWithOrgId(details: job, orgId: string){
    if(this.postJobForm.valid){
      console.log('Job details',details);

      const jobWithOrgId = {...details, orgId: orgId}
      this.apiservice.createJob(jobWithOrgId).subscribe(
        (res)=>{
          console.log('Server res', res);
          if(res.message){
            this.displaySuccess(res.message)
          }  
      },
      (error)=>{
        console.error('Error creating job:', error);
      }
      )
      
    }
  }

  resetForm(){
    this.postJobForm.reset()
  }
}
