import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { talent, talentInfoResponse } from '../../Interfaces/talent.inteface';
import { industry, industryInfoResponse, allIndustriesResponse } from '../../Interfaces/industry.interface';
import { ApiServiceService } from '../../Services/api-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-talent-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './talent-registration.component.html',
  styleUrl: './talent-registration.component.css'
})

export class TalentRegistrationComponent {
  registerTalentForm!: FormGroup;
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false
  // industries: allIndustriesResponse.{} = [];
  industries : industry[] = [];


  constructor(private authservice: AuthServiceService, private fb:FormBuilder, private apiservice: ApiServiceService, private router: Router){
    this.registerTalentForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      industry: ['', [Validators.required]],
      location: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      phone: ['', [Validators.required]],
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

  registerTalent(details: talent){
    if(this.registerTalentForm.valid){
      console.log('Submitting form with details:', details);
      this.authservice.registerTalent(details).subscribe(res =>{
        console.log('Response from server:', res);
        if(res.message){
          this.displaySuccess(res.message)
        }
      })
    }
  }

  resetForm(){
    this.registerTalentForm.reset()
  }
}
