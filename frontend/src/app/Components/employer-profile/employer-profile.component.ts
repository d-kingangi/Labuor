import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../Services/api-service.service';
import { employer, employerInfoResponse, allEmployersResponse } from '../../Interfaces/employer.interface';
import { job, allJobsResponse, jobInfoResponse } from '../../Interfaces/job.interface';

@Component({
  selector: 'app-employer-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.css'
})
export class EmployerProfileComponent {

    employers: employer [] =[];
    employer : employer = {} as employer;
    similarEmployer: employer[] = [];
    employerInfoResponse: employerInfoResponse;
    errorMessage: string = '';

    constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute,){
        this.employerInfoResponse = {} as employerInfoResponse;
    }

    ngOnInit(){
        const employerId = this.route.snapshot.paramMap.get('employerId');
        if (employerId) {
            this.getSingleEmployer(employerId);
        } else {
            console.error('Employer ID not provided');
        }
    }

    getSingleEmployer(id: string) {
        this.apiService.getSingleEmployer(id).subscribe(
            (res: employerInfoResponse) => {
                console.log(res);
                
                res.employer.forEach((employer) => {
                    this.employer = employer;
                })
            },
            (error) => {
                console.error('Error fetching employer:', error);
            }
        )
    }

    // display jobs by this employer

    displayJobsByEmployer(employerId: string){
      console.log('Employer ID:', employerId);

      this.apiService.getJobsByEmployer(employerId).subscribe(
        (res: allJobsResponse) => {
          console.log('Response:', res);
        }
      )
      
    }



    // display similar employers

    fetchEmployersByIndustry(industryId: string) {
        console.log('Fetching employers by industry:', industryId);
        this.apiService.getEmployersByIndustry(industryId).subscribe(
            (res: allEmployersResponse) => {
                console.log('Response:', res);

                if( res && Array.isArray(res.employers)) {
                    this.similarEmployer = res.employers.slice(0, 6);
                    console.log('Similar Employer:', this.similarEmployer);
                } else {
                    this.errorMessage = 'Unexpected response structure.';
                    console.error('Unexpected response structure:', res);
                }
            },
            (error) => {
                this.errorMessage = 'Error fetching similar employers. Please try again.';
                console.error('Error fetching employers:', error);
            }
        )
    }


    navigateToSingleEmployer(employerId: string) {
        console.log('Employer ID:', employerId);

        this.apiService.getSingleEmployer(employerId).subscribe(
            (res: employerInfoResponse) => {
                console.log('Response:', res);

                if (res) {
                  this.employerInfoResponse = res;
                  console.log('Employer:', this.employerInfoResponse);
                  this.router.navigate(['/employer-profile', employerId]);
                } else {
                  console.error('Employer not found or an error occurred:', res);
                }
            }, 
            (error) => {
                console.error('Error fetching employer:', error);
            }
        )
    }
}
