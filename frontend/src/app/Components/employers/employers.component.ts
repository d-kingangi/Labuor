import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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
  employerInfoResponse: employerInfoResponse;
  employersByIndustry: { industryId: string; employers: employer[] }[] = [];
  isLoading = false;
  error = '';

  constructor(private apiService: ApiServiceService, private router: Router) {
    this.employerInfoResponse = {} as employerInfoResponse;
    this.displayAllEmployers();
  }

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

  navigateToSingleEmployer(employerId: string){
    console.log('EmployerId:', employerId);

    this.apiService.getSingleEmployer(employerId).subscribe(
      (res: employerInfoResponse) => {
        console.log('Response:', res);

        if(res){
          this.employerInfoResponse = res;
          console.log('Employer Info:', this.employerInfoResponse);
          // this.router.navigate(['/employer', employerId])
        } else {
          console.error('Employernot found or an error occurred:', res);
        }      
      }, 
      (error) =>{
        console.error('Error fetching employer:', error);
      }
    )
    
  }

}
