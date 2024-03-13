import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginDetails, loginResponse } from '../../Interfaces/login.interface';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ApiServiceService } from '../../Services/api-service.service';
import { response } from 'express';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NavbarComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm!: FormGroup;
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false

  storeToken(token: string){
    localStorage.setItem('token', token)
  }

  displaySuccess(msg:string, route:string, token: string){
    this.successMsg = msg;
          this.storeToken(token)
          this.successDiv = true
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate([`${route}`])
    }, 2000);
  }

  displayErrors(msg: string){
    this.errorMsg = msg;
    this.errorDiv = true

    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }
  
  constructor( private apiservice: ApiServiceService,private authservice: AuthServiceService, private fb:FormBuilder, private router:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  loginUser(details: loginDetails){
    if(this.loginForm.valid){
      this.authservice.loginUser(details).subscribe(response =>{
        console.log(response);
        if(response.message){
          this.apiservice.checkUserDetails(response.token).subscribe((res: any) =>{
            if (res.info.isAdmin){
              this.displaySuccess(response.message, 'admin/products', response.token);
            }
            else if(!res.info.isAdmin){
              this.displaySuccess(response.message, '', response.token)
            } else if(response.error){
              this.displayErrors(response.error)
            }
          })
        }
      })
    } else {
      this.displayErrors('Please fill in all the fields')

    }
  }
}
