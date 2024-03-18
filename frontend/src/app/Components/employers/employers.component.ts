import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { employer, employerInfoResponse, allEmployersResponse } from '../../Interfaces/employer.interface';


@Component({
  selector: 'app-employers',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './employers.component.html',
  styleUrl: './employers.component.css'
})

export class EmployersComponent {

  employers: employer[] =[];
  employer: employer | null = null;
  employerInfoResponse= {} as employerInfoResponse;
  employersByIndustry: { industryId: string; employers: employer[] }[] = [];
  isLoading = false;
  error = '';


  
    /**
   * A description of the entire function.
   *
   * @param {ApiServiceService} apiService - description of parameter
   * @param {Router} router - description of parameter
   * @return {void} description of return value
   */

  constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute,) {
    this.displayAllEmployers();
  }

    /**
   * Display all employers and organize them by industry.
   */
  displayAllEmployers(){
    this.isLoading = true;
    this.error = '';
    this.employersByIndustry = []

    this.apiService.getAllEmployers().subscribe(
      (res: {employers: employer[]}) => {
        
        if(res && Array.isArray(res.employers)){
          res.employers.forEach((employer: employer) => {
            const industryIndex = this.employersByIndustry.findIndex(
              (industry) => industry.industryId === employer.industryId
            )

            if(industryIndex !== -1){
              this.employersByIndustry[industryIndex].employers.push(employer);
            } else {
              this.employersByIndustry.push({
                industryId: employer.industryId,
                employers: [employer]
              });
            }
          });
        } else {
          console.error('Unexpected response structure:', res);
          this.error= 'Unexpected response structure. Please try again later.'
        }
        this.isLoading = false
      }, 
      (error) => {
        console.error('Error fetching employer:', error);
        this.error = 'Failed to fetch talents. Please try again later.';
        this.isLoading = false;
      }
    )
  }

    /**
   * A function that navigates to a single employer based on the provided employer ID.
   *
   * @param {string} employerId - The ID of the employer to navigate to
   */

  navigateToSingleEmployer(orgId: string){
    console.log('EmployerId:', orgId);

    this.apiService.getSingleEmployer(orgId).subscribe(
      (res: employerInfoResponse) => {
        console.log('Response:', res);

        if(res){
          res.employer.forEach((employer)=>{ this.employer = employer })
          console.log('Employer Info:', this.employerInfoResponse);
          this.router.navigate(['/employer-profile', orgId])
        } else {
          console.error('Employer not found or an error occurred:', res);
        }      
      }, 
      (error) =>{
        console.error('Error fetching employer:', error);
      }
    )
  }

}
