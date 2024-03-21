import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { job, jobInfoResponse } from '../../Interfaces/job.interface';
import { ApiServiceService } from '../../Services/api-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { industry, industryInfoResponse, allIndustriesResponse } from '../../Interfaces/industry.interface';
import { userInfo } from 'os';

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
    })
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

  createJob(details: job){
    if(this.postJobForm.valid){
      console.log('Job details',details);
      this.apiservice.createJob(details).subscribe(res=>{
        console.log('Server res', res);
        if(res.message){
          this.displaySuccess(res.message)
        }
      })
      
    }
  }

  // createJob(details:job){
  //   this.authservice.checkUserDetails(this.getToken()).subscribe(
  //     (employer) = >{
  //       const details = {
  //         orgId: 
  //       }

  //       this.apiservice.createJob(details).subscribe(res=>{
  //               console.log('Server res', res);
  //               if(res.message){
  //                 this.displaySuccess(res.message)
  //               }
  //             })
  //     }
  //   )
  // }

  

  resetForm(){
    this.postJobForm.reset()
  }
}
