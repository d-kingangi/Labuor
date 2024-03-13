import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { employer, employerInfoResponse } from '../../Interfaces/employer.interface';
import { industry, industryInfoResponse, allIndustriesResponse } from '../../Interfaces/industry.interface';
import { ApiServiceService } from '../../Services/api-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-employer-registration',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './employer-registration.component.html',
  styleUrl: './employer-registration.component.css'
})

export class EmployerRegistrationComponent {
    registerEmployerForm! : FormGroup;
    errorMsg! : string;
    successMsg!: string;
    errorDiv = false
    successDiv = false
     // industries: allIndustriesResponse.{} = [];
    industries : industry[] = [];

    constructor(private authservice: AuthServiceService,  private fb:FormBuilder, private apiservice: ApiServiceService, private router: Router){
      this.registerEmployerForm = this.fb.group({
        orgname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        industry: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
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

    displayErrors(msg: string){
      this.errorMsg = msg;
      this.errorDiv = true
  
      setTimeout(() => {
        this.errorDiv = false
      }, 2000);
    }

    registerEmployer(details: employer){
      if(this.registerEmployerForm.valid){
        console.log('Details:', details);
        this.authservice.registerEmployer(details).subscribe(res=>{
          console.log('Response:', res);
          // if(res.message){
          //   this.displaySuccess(res.message)
          // }
        })    
      }
    }
    resetForm(){}
}
