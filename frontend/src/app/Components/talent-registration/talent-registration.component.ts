import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { talent, talentInfoResponse } from '../../Interfaces/talent.inteface';

@Component({
  selector: 'app-talent-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './talent-registration.component.html',
  styleUrl: './talent-registration.component.css'
})

export class TalentRegistrationComponent {
  registerTalentForm!: FormGroup;
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false

  constructor(private authservice: AuthServiceService, private fb:FormBuilder){
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
  }

  displaySuccess(msg:string){
    this.successMsg = msg;
    this.successDiv = true
    setTimeout(() => {
      this.successDiv = false
      // this.router.navigate(['/login'])
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
      this.authservice.registerTalent(details).subscribe(res =>{
        if(res.message){
          this.displaySuccess(res.message)
        }
      })
    }
  }
}
